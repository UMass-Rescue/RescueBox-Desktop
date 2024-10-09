import { v4 as uuidv4 } from 'uuid';
import { Inputs, Outputs, Parameters } from 'src/shared/job';
import log from 'electron-log/main';
import JobDb, { JobStatus } from '../models/job';
import { getInferenceTaskByModelUid } from '../model-apps/config';
import ModelServerDb from '../models/model-server';
import {
  ErrorResponse,
  SuccessResponse,
} from '../model-apps/inference-service';
import { getRaw } from '../util';

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
  log.info(
    'Updating job end time and status in the database for job',
    args.uid,
  );
  await JobDb.updateJobEndTime(args.uid, args.endTime);
  await JobDb.updateJobStatus(args.uid, args.status);
  if (args.status === JobStatus.Failed) {
    await JobDb.updateJobStatusText(args.uid, args.statusText!);
  } else {
    await JobDb.updateJobResponse(args.uid, args.response!);
  }
};

const cancelJob = async (_event: any, args: JobByIdArgs) => {
  log.info('Canceling job', args.uid);
  const manager = getInferenceTaskByModelUid(
    await JobDb.getJobByUid(args.uid).then((job) => {
      if (!job) throw new Error(`Job not found with uid ${args.uid}`);
      return job.modelUid;
    }),
  );
  manager.cancelInference();

  await JobDb.updateJobEndTime(args.uid, new Date());
  await JobDb.updateJobStatus(args.uid, JobStatus.Canceled);
  await JobDb.updateJobStatusText(args.uid, 'Job canceled by user.');
};

const runJob = async (_event: any, arg: RunJobArgs) => {
  log.info(`Creating a job for model ${arg.modelUid}`);
  // Setup job parameters
  const uid = uuidv4();
  const manager = getInferenceTaskByModelUid(arg.modelUid);
  const server = await ModelServerDb.getServerByModelUid(arg.modelUid);
  if (!server) {
    throw new Error(`Server not found for model ${arg.modelUid}`);
  }

  log.info('Trying to create a job in the Job model');

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
    log.error(
      `Encountered an error while creating job for model id ${arg.modelUid}`,
    );
    log.error('Error details:', err);
    throw new Error('Error creating job');
  }

  // Call the inference service for the particular model,
  // and update the job status after a reply is received
  log.info('Calling inference service for model', arg.modelUid);
  manager
    .runInference({ ...arg, server })
    .then(async (response: SuccessResponse | ErrorResponse) => {
      const job = await JobDb.getJobByUid(uid);
      if (job?.status === JobStatus.Canceled) {
        log.info('Job Canceled: Not updating job information.');
        return null;
      }
      if (response instanceof SuccessResponse) {
        log.info('SuccessResponse: Updating job information.');
        completeJob({
          uid,
          endTime: new Date(),
          status: JobStatus.Completed,
          response: response.data,
        });
        return null;
      }
      if (response instanceof ErrorResponse) {
        log.info('ErrorResponse: Updating job information.');
        log.info(response.error);
        completeJob({
          uid,
          endTime: new Date(),
          status: JobStatus.Failed,
          statusText: JSON.stringify(response.error),
        });
        return null;
      }
      throw new Error('FATAL: Invalid response type.');
    })
    .catch(async (err) => {
      log.error('Request failed: Updating job information.');
      completeJob({
        uid,
        status: JobStatus.Failed,
        endTime: new Date(),
        statusText: err.message,
      } as CompleteJobArgs);
      return null;
    });
  log.info('Job model created successfully, fetching job from database.');
  return JobDb.getJobByUid(uid).then(getRaw);
};

const getJobById = async (_event: any, arg: JobByIdArgs) => {
  return JobDb.getJobByUid(arg.uid).then(getRaw);
};

const deleteJobById = async (_event: any, arg: JobByIdArgs) => {
  log.info('Deleting job by id', arg.uid);
  return JobDb.deleteJob(arg.uid);
};

export { getJobs, runJob, getJobById, deleteJobById, cancelJob };
