// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import {
  GetModelAppStatusArgs,
  RegisterModelArgs,
  UnregisterModelArgs,
} from './handlers/registration';
import { CreateJobArgs } from './handlers/job';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

const registrationHandler = {
  registerModelAppIp: (args: RegisterModelArgs) =>
    ipcRenderer.invoke('register:register-model-app-ip', args),
  unregisterModelAppIp: (args: UnregisterModelArgs) =>
    ipcRenderer.invoke('register:unregister-model-app-ip', args),
  getModelAppStatus: (args: GetModelAppStatusArgs) =>
    ipcRenderer.invoke('register:get-model-app-status', args),
};

const jobHandler = {
  createJob: (args: CreateJobArgs) =>
    ipcRenderer.invoke('job:create-job', args),
};

contextBridge.exposeInMainWorld('electron', electronHandler);
contextBridge.exposeInMainWorld('registration', registrationHandler);
contextBridge.exposeInMainWorld('job', jobHandler);

export type ElectronHandler = typeof electronHandler;
export type RegistrationHandler = typeof registrationHandler;
export type JobHandler = typeof jobHandler;
