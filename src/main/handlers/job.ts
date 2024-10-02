import { v4 as uuidv4 } from 'uuid';
import { error, log } from 'electron-log';
import Job, { Inputs, JobStatus, Outputs, Parameters } from '../models/job';
import { getServiceByModelUid } from '../model-apps/config';
import ModelServer from '../models/model-server';
import {
  ErrorResponse,
  SuccessResponse,
} from '../model-apps/inference-service';

export type CreateJobArgs = {
  modelUid: string;
  inputs: Inputs;
  outputs: Outputs;
  parameters: Parameters;
};

export type JobByIdArgs = {
  uid: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getJobs = async (_event: any, _arg: any) => {
  const jobs: Job[] = [];
  await Promise.all(
    jobs.map(async (job) => {
      await Job.getJobByUid(job.uid).then((prevJob) => {
        if (prevJob) {
          return prevJob.update({ ...job });
        }
        return Job.createJob(
          job.uid,
          job.modelUid,
          job.startTime,
          job.inputs,
          job.outputs,
          job.parameters,
        );
      });
    }),
  );
  return Job.findAll({ raw: true });
};

const createJob = async (_event: any, arg: CreateJobArgs) => {
  // Setup job parameters
  const uid = uuidv4();
  const service = getServiceByModelUid(arg.modelUid);
  const server = await ModelServer.getServerByModelUid(arg.modelUid);
  log(`Getting server for model ${arg.modelUid}`);
  if (!server) {
    throw new Error(`Server not found for model ${arg.modelUid}`);
  }

  log('Trying to create a job in the Job model');

  // Create a job in the database
  try {
    await Job.createJob(
      uid,
      arg.modelUid,
      new Date(),
      arg.inputs,
      arg.outputs,
      arg.parameters,
    );
  } catch (err) {
    error(
      `Encountered an error while creating job for model id ${arg.modelUid}`,
    );
    error('Error details:', err);
    throw new Error('Error creating job');
  }

  // Call the inference service for the particular model,
  // and update the job status after a reply is received
  log('Calling inference service');
  service
    .runInference({ ...arg, server })
    .then(async (response: SuccessResponse | ErrorResponse) => {
      if (response instanceof SuccessResponse) {
        const time = new Date();
        log('Inference service returned successfully');
        log('Updating job status and response and end time');
        await Job.updateJobEndTime(uid, time);
        await Job.updateJobStatus(uid, JobStatus.Completed);
        await Job.updateJobResponse(uid, response.data);
        return null;
      }
      if (response instanceof ErrorResponse) {
        log('Inference service failed, received ErrorResponse');
        log('Updating job status and log output');
        await Job.updateJobEndTime(uid, new Date());
        await Job.updateJobStatus(uid, JobStatus.Failed);
        await Job.updateJobResponse(uid, response.error);
        return null;
      }
      throw new Error('FATAL: Invalid response type');
    })
    .catch(async (err) => {
      log('Inference service failed, request failed');
      log('Updating job status and log output');
      await Job.updateJobEndTime(uid, new Date());
      await Job.updateJobStatus(uid, JobStatus.Failed);
      await Job.updateJobStatusText(uid, err.message);
      return null;
    });
  log('Job model created successfully, returning Job.getJobByUid(uid)');
  return Job.getJobByUid(uid);
};

const completeJob = async (_event: any, arg: JobByIdArgs) => {
  await Job.updateJobEndTime(arg.uid, new Date());
  await Job.updateJobStatus(arg.uid, JobStatus.Completed);
  return Job.getJobByUid(arg.uid);
};

const getJobById = async (_event: any, arg: JobByIdArgs) => {
  return Job.getJobByUid(arg.uid);
};

const deleteJobById = async (_event: any, arg: JobByIdArgs) => {
  return Job.deleteJob(arg.uid);
};

export { getJobs, createJob, completeJob, getJobById, deleteJobById };
