// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer } from 'electron';
import {
  GetModelAppStatusArgs,
  RegisterModelArgs,
  UnregisterModelArgs,
} from './registration';

const registrationHandler = {
  registerModelAppIp: (args: RegisterModelArgs) =>
    ipcRenderer.invoke('register:register-model-app-ip', args),
  unregisterModelAppIp: (args: UnregisterModelArgs) =>
    ipcRenderer.invoke('register:unregister-model-app-ip', args),
  getModelAppStatus: (args: GetModelAppStatusArgs) =>
    ipcRenderer.invoke('register:get-model-app-status', args),
};

contextBridge.exposeInMainWorld('registration', registrationHandler);

export type RegistrationHandler = typeof registrationHandler;
