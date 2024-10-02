// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer } from 'electron';
import {
  GetModelAppStatusArgs,
  ModelAppStatus,
  RegisterModelArgs,
  UnregisterModelArgs,
} from './handlers/registration';
import { RunJobArgs, JobByIdArgs } from './handlers/job';
import { GetModelByIdArgs } from './handlers/models';
import { OpenDirectoryArgs } from './handlers/file-system';
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
  runJob: (args: RunJobArgs) =>
    ipcRenderer.invoke('job:run-job', args) as Promise<Job>,
  completeJob: (args: JobByIdArgs) =>
    ipcRenderer.invoke('job:complete-job', args) as Promise<Job>,
  deleteJobById: (args: JobByIdArgs) =>
    ipcRenderer.invoke('job:delete-job-by-id', args) as Promise<number>,
};

const fileSystemHandler = {
  openDirectory: (args: OpenDirectoryArgs) =>
    ipcRenderer.invoke('fileSystem:open-directory', args) as Promise<string>,
  selectDirectory: () =>
    ipcRenderer.invoke('fileSystem:select-directory') as Promise<string>,
};

contextBridge.exposeInMainWorld('registration', registrationHandler);
contextBridge.exposeInMainWorld('models', modelsHandler);
contextBridge.exposeInMainWorld('job', jobHandler);
contextBridge.exposeInMainWorld('fileSystem', fileSystemHandler);

export type RegistrationHandler = typeof registrationHandler;
export type ModelsHandler = typeof modelsHandler;
export type JobHandler = typeof jobHandler;
export type FileSystemHandler = typeof fileSystemHandler;
