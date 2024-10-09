// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer } from 'electron';
import {
  MLModel,
  ModelServer,
  Job,
  ModelAppStatus,
  ModelAppConfig,
} from 'src/shared/models';
import {
  GetModelAppStatusArgs,
  RegisterModelArgs,
  UnregisterModelArgs,
} from './handlers/registration';
import { RunJobArgs, JobByIdArgs } from './handlers/job';
import { GetModelByIdArgs } from './handlers/models';
import { PathArgs } from './handlers/file-system';

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
  getModelServers: () =>
    ipcRenderer.invoke('register:get-model-servers') as Promise<ModelServer[]>,
};

const modelsHandler = {
  getModels: () =>
    ipcRenderer.invoke('models:get-models') as Promise<MLModel[]>,
  getModelByUid: (args: GetModelByIdArgs) =>
    ipcRenderer.invoke('models:get-model-by-uid', args) as Promise<MLModel>,
  getModelAppConfigByUid: (args: GetModelByIdArgs) =>
    ipcRenderer.invoke(
      'models:get-model-app-config-by-uid',
      args,
    ) as Promise<ModelAppConfig>,
};

const jobHandler = {
  getJobs: () => ipcRenderer.invoke('job:get-jobs') as Promise<Job[]>,
  getJobById: (args: JobByIdArgs) =>
    ipcRenderer.invoke('job:get-job-by-id', args) as Promise<Job>,
  runJob: (args: RunJobArgs) =>
    ipcRenderer.invoke('job:run-job', args) as Promise<Job>,
  cancelJob: (args: JobByIdArgs) =>
    ipcRenderer.invoke('job:cancel-job', args) as Promise<void>,
  deleteJobById: (args: JobByIdArgs) =>
    ipcRenderer.invoke('job:delete-job-by-id', args) as Promise<number>,
};

const fileSystemHandler = {
  openPath: (args: PathArgs) =>
    ipcRenderer.invoke('fileSystem:open-path', args) as Promise<string>,
  selectDirectory: () =>
    ipcRenderer.invoke('fileSystem:select-directory') as Promise<string>,
  saveLogs: () => ipcRenderer.invoke('fileSystem:save-logs'),
  getFilesFromDir: (args: PathArgs) =>
    ipcRenderer.invoke('fileSystem:get-files-from-dir', args) as Promise<
      string[]
    >,
  deleteFile: (args: PathArgs) =>
    ipcRenderer.invoke('fileSystem:delete-file', args) as Promise<void>,
};

const databaseHandler = {
  resetDatabase: () => ipcRenderer.invoke('database:reset-database'),
};

const loggingHandler = {
  getLogs: () =>
    ipcRenderer.invoke('logging:get-logs') as Promise<
      {
        path: string;
        lines: string[];
      }[]
    >,
  clearLogs: () => ipcRenderer.invoke('logging:clear-logs') as Promise<boolean>,
};

contextBridge.exposeInMainWorld('registration', registrationHandler);
contextBridge.exposeInMainWorld('models', modelsHandler);
contextBridge.exposeInMainWorld('job', jobHandler);
contextBridge.exposeInMainWorld('fileSystem', fileSystemHandler);
contextBridge.exposeInMainWorld('database', databaseHandler);
contextBridge.exposeInMainWorld('logging', loggingHandler);

export type RegistrationHandler = typeof registrationHandler;
export type ModelsHandler = typeof modelsHandler;
export type JobHandler = typeof jobHandler;
export type FileSystemHandler = typeof fileSystemHandler;
export type DatabaseHandler = typeof databaseHandler;
export type LoggingHandler = typeof loggingHandler;
