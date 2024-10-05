import { v4 as uuidv4 } from 'uuid';
import { error, log } from 'electron-log';
import JobDb, { Inputs, JobStatus, Outputs, Parameters } from '../models/job';
import { getServiceByModelUid } from '../model-apps/config';
import ModelServerDb from '../models/model-server';
import {
  ErrorResponse,
  SuccessResponse,
} from '../model-apps/inference-service';
import { getRaw } from '../util';
import JobManager from '../model-apps/inference-task';

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
  return JobDb.getAllJobs().then((jobsDb) => jobsDb.map(getRaw));
};

const completeJob = async (args: CompleteJobArgs) => {
  await JobDb.updateJobEndTime(args.uid, args.endTime);
  await JobDb.updateJobStatus(args.uid, args.status);
  if (args.status === JobStatus.Failed) {
    await JobDb.updateJobStatusText(args.uid, args.statusText!);
  } else {
    await JobDb.updateJobResponse(args.uid, args.response!);
  }
};

const cancelJob = async (_event: any, args: JobByIdArgs) => {
  const manager = new JobManager(
    await JobDb.getJobByUid(args.uid).then((job) =>
      getServiceByModelUid(job!.modelUid),
    ),
  );
  manager.cancelInference();

  await JobDb.updateJobEndTime(args.uid, new Date());
  await JobDb.updateJobStatus(args.uid, JobStatus.Canceled);
  await JobDb.updateJobStatusText(args.uid, 'Job canceled by user.');
};

const runJob = async (_event: any, arg: RunJobArgs) => {
  // Setup job parameters
  const uid = uuidv4();
  const manager = new JobManager(getServiceByModelUid(arg.modelUid));
  const server = await ModelServerDb.getServerByModelUid(arg.modelUid);
  log(`Getting server for model ${arg.modelUid}`);
  if (!server) {
    throw new Error(`Server not found for model ${arg.modelUid}`);
  }

  log('Trying to create a job in the Job model');

  // Create a job in the database
  try {
    await JobDb.createJob(
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
  manager
    .runInference({ ...arg, server })
    .then(async (response: SuccessResponse | ErrorResponse) => {
      const job = await JobDb.getJobByUid(uid);
      if (job?.status === JobStatus.Canceled) {
        log('Job Canceled: Not updating job information.');
        return null;
      }
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
  return JobDb.getJobByUid(uid).then(getRaw);
};

const getJobById = async (_event: any, arg: JobByIdArgs) => {
  return JobDb.getJobByUid(arg.uid).then(getRaw);
};

const deleteJobById = async (_event: any, arg: JobByIdArgs) => {
  return JobDb.deleteJob(arg.uid);
};

export { getJobs, runJob, getJobById, deleteJobById, cancelJob };
