import { v4 as uuidv4 } from 'uuid';
import Job, { JobStatus } from '../models/job';

export type CreateJobArgs = {
  modelUid: string;
  inputDir: string;
  outputDir: string;
  parameters: string;
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
      inputDir: 'C:/Users/JohnDoe/imgs_input',
      outputDir: 'C:/Users/JohnDoe/imgs_output',
      parameters: '{"epochs": 10, "batch_size": 32}',
      logOutput: '[INFO] Job completed successfully.',
      status: JobStatus.Completed,
    },
    {
      uid: 'job-e5f6g7h8',
      modelUid: 'model-e5f6g7h8',
      startTime: new Date('2023-10-25T15:30:00Z'),
      endTime: new Date('2023-10-25T16:00:00Z'),
      inputDir: 'C:/Users/JaneSmith/sentences_input',
      outputDir: 'C:/Users/JaneSmith/sentences_output',
      parameters: '{"vocab_size": 10000, "embedding_dim": 300}',
      logOutput: '[INFO] Job completed successfully.',
      status: JobStatus.Completed,
    },
    {
      uid: 'job-i9j0k1l2',
      modelUid: 'model-i9j0k1l2',
      startTime: new Date('2023-10-24T08:00:00Z'),
      inputDir: 'C:/Users/DavidLee/data_input',
      outputDir: 'C:/Users/DavidLee/data_output',
      parameters: '{"threshold": 0.9, "max_features": 100}',
      logOutput: '[INFO] Job currently running...',
      status: JobStatus.Running,
    },
    {
      uid: 'job-m3n4o5p6',
      modelUid: 'model-e5f6g7h8',
      startTime: new Date('2023-10-23T12:00:00Z'),
      inputDir: 'C:/Users/JaneSmith/sentenes_input',
      outputDir: 'C:/Users/JaneSmith/sentences_output',
      parameters: '{"vocab_size": 5000, "embedding_dim": 200}',
      logOutput: '[ERROR] Job failed. Invalid input directory.',
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
          job.inputDir,
          job.outputDir,
          job.parameters,
        );
      });
    }),
  );
  return Job.findAll({ raw: true });
};

const createJob = async (_event: any, arg: CreateJobArgs) => {
  // TODO: Handle FlaskML model invocation here or elsewhere
  const uid = uuidv4();
  await Job.createJob(
    uid,
    arg.modelUid,
    new Date(),
    arg.inputDir,
    arg.outputDir,
    arg.parameters,
  );
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
