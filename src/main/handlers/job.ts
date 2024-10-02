import { v4 as uuidv4 } from 'uuid';
import { error, log } from 'electron-log';
import Job, { Inputs, JobStatus, Outputs, Parameters } from '../models/job';
import { getServiceByModelUid } from '../model-apps/config';
import ModelServer from '../models/model-server';

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
  const jobs = [
    {
      uid: 'job-a1b2c3d4',
      modelUid: 'model-a1b2c3d4',
      startTime: new Date('2023-10-26T10:00:00Z'),
      endTime: new Date('2023-10-26T10:30:00Z'),
      parameters: [
        {
          epoch: 10,
          batch_size: 32,
        },
      ],
      inputs: [
        {
          name: 'input1',
          path: 'C:/Users/JohnDoe/input1',
        },
      ],
      outputs: [
        {
          name: 'output1',
          path: 'C:/Users/JohnDoe/output1',
        },
      ],
      logOutput: '[INFO] Job completed successfully.',
      status: JobStatus.Completed,
    },
    {
      uid: 'job-a1b2c3d4',
      modelUid: 'model-a1b2c3d4',
      startTime: new Date('2023-10-26T10:00:00Z'),
      endTime: new Date('2023-10-26T10:30:00Z'),
      parameters: [
        {
          epoch: 10,
          batch_size: 32,
        },
      ],
      inputs: [
        {
          name: 'input1',
          path: 'C:/Users/JohnDoe/input1',
        },
      ],
      outputs: [
        {
          name: 'output1',
          path: 'C:/Users/JohnDoe/output1',
        },
      ],
      logOutput: '[INFO] Job completed successfully.',
      status: JobStatus.Completed,
    },
    {
      uid: 'job-a1b2c3d4',
      modelUid: 'model-a1b2c3d4',
      startTime: new Date('2023-10-26T10:00:00Z'),
      endTime: new Date('2023-10-26T10:30:00Z'),
      parameters: [
        {
          epoch: 10,
          batch_size: 32,
        },
      ],
      inputs: [
        {
          name: 'input1',
          path: 'C:/Users/JohnDoe/input1',
        },
      ],
      outputs: [
        {
          name: 'output1',
          path: 'C:/Users/JohnDoe/output1',
        },
      ],
      logOutput: '[INFO] Job completed successfully.',
      status: JobStatus.Running,
    },
    {
      uid: 'job-a1b2c3d4',
      modelUid: 'model-a1b2c3d4',
      startTime: new Date('2023-10-26T10:00:00Z'),
      endTime: new Date('2023-10-26T10:30:00Z'),
      parameters: [
        {
          epoch: 10,
          batch_size: 32,
        },
      ],
      inputs: [
        {
          name: 'input1',
          path: 'C:/Users/JohnDoe/input1',
        },
      ],
      outputs: [
        {
          name: 'output1',
          path: 'C:/Users/JohnDoe/output1',
        },
      ],
      logOutput: '[INFO] Job completed successfully.',
      status: JobStatus.Failed,
    },
  ];
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
  if (!server) {
    throw new Error(`Server not found for model ${arg.modelUid}`);
  }

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
  service
    .runInference({ ...arg, server })
    .then((result) => {
      const time = new Date();
      Job.updateJobEndTime(uid, time);
      Job.updateJobStatus(uid, JobStatus.Completed);
      Job.updateJobResponse(uid, result);
      return null;
    })
    .catch((err) => {
      Job.updateJobEndTime(uid, new Date());
      Job.updateJobStatus(uid, JobStatus.Failed);
      Job.updateJobLogOutput(uid, err.message);
      return null;
    });
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
