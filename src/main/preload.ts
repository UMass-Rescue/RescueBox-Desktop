// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer } from 'electron';
import {
  GetModelAppStatusArgs,
  ModelAppStatus,
  RegisterModelArgs,
  UnregisterModelArgs,
} from './handlers/registration';
import { CreateJobArgs, JobByIdArgs } from './handlers/job';
import { GetModelByIdArgs } from './handlers/models';
import MLModel from './models/ml-model';
import ModelServer from './models/model-server';
import Job from './models/job';

const registrationHandler = {
  registerModelAppIp: (args: RegisterModelArgs) =>
    ipcRenderer.invoke(
      'register:register-model-app-ip',
      args,
    ) as Promise<ModelServer>,
  unregisterModelAppIp: (args: UnregisterModelArgs) =>
    ipcRenderer.invoke(
      'register:unregister-model-app-ip',
      args,
    ) as Promise<number>,
  getModelAppStatus: (args: GetModelAppStatusArgs) =>
    ipcRenderer.invoke(
      'register:get-model-app-status',
      args,
    ) as Promise<ModelAppStatus>,
};

const modelsHandler = {
  getModels: () =>
    ipcRenderer.invoke('models:get-models') as Promise<MLModel[]>,
  getModelByUid: (args: GetModelByIdArgs) =>
    ipcRenderer.invoke('models:get-model-by-uid', args) as Promise<MLModel>,
};

const jobHandler = {
  getJobs: () => ipcRenderer.invoke('job:get-jobs') as Promise<Job[]>,
  getJobById: (args: JobByIdArgs) =>
    ipcRenderer.invoke('job:get-job-by-id', args) as Promise<Job>,
  createJob: (args: CreateJobArgs) =>
    ipcRenderer.invoke('job:create-job', args) as Promise<Job>,
  deleteJobById: (args: JobByIdArgs) =>
    ipcRenderer.invoke('job:delete-job-by-id', args) as Promise<number>,
};

contextBridge.exposeInMainWorld('registration', registrationHandler);
contextBridge.exposeInMainWorld('models', modelsHandler);
contextBridge.exposeInMainWorld('job', jobHandler);

export type RegistrationHandler = typeof registrationHandler;
export type ModelsHandler = typeof modelsHandler;
export type JobHandler = typeof jobHandler;
