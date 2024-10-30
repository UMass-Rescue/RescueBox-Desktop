// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer } from 'electron';
import {
  MLModel,
  ModelServer,
  Job,
  ModelAppStatus,
  RunJobArgs,
} from 'src/shared/models';
import {
  ModelInfo,
  SchemaAPIRoute,
  TaskSchema,
} from 'src/shared/generated_models';
import {
  GetModelAppStatusArgs,
  RegisterModelArgs,
  UnregisterModelArgs,
} from './handlers/registration';
import { JobByIdArgs } from './handlers/job';
import { GetModelByIdArgs } from './handlers/models';
import { PathArgs } from './handlers/file-system';
import {
  GetApiRoutesArgs,
  GetInfoArgs,
  GetTaskSchemaArgs,
} from './handlers/task';

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
  showFileInExplorer: (args: PathArgs) =>
    ipcRenderer.invoke(
      'fileSystem:show-file-in-explorer',
      args,
    ) as Promise<void>,
  selectDirectory: () =>
    ipcRenderer.invoke('fileSystem:select-directory') as Promise<string>,
  selectDirectories: () =>
    ipcRenderer.invoke('fileSystem:select-directories') as Promise<string[]>,
  selectFile: () =>
    ipcRenderer.invoke('fileSystem:select-file') as Promise<string>,
  selectFiles: () =>
    ipcRenderer.invoke('fileSystem:select-files') as Promise<string[]>,
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

const taskHandler = {
  getApiRoutes: (args: GetApiRoutesArgs) =>
    ipcRenderer.invoke('task:get-api-routes', args) as Promise<
      SchemaAPIRoute[]
    >,
  getInfo: (args: GetInfoArgs) =>
    ipcRenderer.invoke('task:get-info', args) as Promise<ModelInfo>,
  getTaskSchema: (args: GetTaskSchemaArgs) =>
    ipcRenderer.invoke('task:get-task-schema', args) as Promise<TaskSchema>,
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
contextBridge.exposeInMainWorld('task', taskHandler);

export type RegistrationHandler = typeof registrationHandler;
export type ModelsHandler = typeof modelsHandler;
export type JobHandler = typeof jobHandler;
export type FileSystemHandler = typeof fileSystemHandler;
export type DatabaseHandler = typeof databaseHandler;
export type LoggingHandler = typeof loggingHandler;
export type TaskHandler = typeof taskHandler;
