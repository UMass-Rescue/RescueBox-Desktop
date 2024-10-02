import { v4 as uuidv4 } from 'uuid';
import { error, log } from 'electron-log';
import Job, { Inputs, JobStatus, Outputs, Parameters } from '../models/job';
import { getServiceByModelUid } from '../model-apps/config';
import ModelServer from '../models/model-server';
import {
  ErrorResponse,
  SuccessResponse,
} from '../model-apps/inference-service';

export type RunJobArgs = {
  modelUid: string;
  inputs: Inputs;
  outputs: Outputs;
  parameters: Parameters;
};

export type JobByIdArgs = {
  uid: string;
};

export type CompleteJobArgs = {
  uid: string;
  endTime: Date;
  status: JobStatus;
  response?: object;
  statusText?: string;
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

const completeJob = async (args: CompleteJobArgs) => {
  await Job.updateJobEndTime(args.uid, args.endTime);
  await Job.updateJobStatus(args.uid, args.status);
  if (args.status === JobStatus.Failed) {
    await Job.updateJobStatusText(args.uid, args.statusText!);
  } else {
    await Job.updateJobResponse(args.uid, args.response!);
  }
};

const runJob = async (_event: any, arg: RunJobArgs) => {
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
        log('SuccessResponse: Updating job information.');
        completeJob({
          uid,
          endTime: new Date(),
          status: JobStatus.Completed,
          response: response.data,
        } as CompleteJobArgs);
        return null;
      }
      if (response instanceof ErrorResponse) {
        log('ErrorResponse: Updating job information.');
        completeJob({
          uid,
          endTime: new Date(),
          status: JobStatus.Completed,
          response: response.error,
        } as CompleteJobArgs);
        return null;
      }
      throw new Error('FATAL: Invalid response type.');
    })
    .catch(async (err) => {
      log('Request failed: Updating job information.');
      completeJob({
        uid,
        status: JobStatus.Failed,
        endTime: new Date(),
        statusText: err.message,
      } as CompleteJobArgs);
      return null;
    });
  log('Job model created successfully, fetching job from database.');
  return Job.getJobByUid(uid);
};

const getJobById = async (_event: any, arg: JobByIdArgs) => {
  return Job.getJobByUid(arg.uid);
};

const deleteJobById = async (_event: any, arg: JobByIdArgs) => {
  return Job.deleteJob(arg.uid);
};

export { getJobs, runJob, getJobById, deleteJobById };
