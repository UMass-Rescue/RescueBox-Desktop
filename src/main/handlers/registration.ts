/* eslint-disable @typescript-eslint/no-unused-vars */
import { ModelAppStatus } from 'src/shared/models';
import log from 'electron-log/main';
import { ModelInfo } from 'src/shared/generated_models';
import ModelServer from '../models/model-server';
import { getRaw } from '../util';
import ModelAppService from '../flask-ml/model-app-service';
import MLModelDb from '../models/ml-model';
import RegisterModelService from '../flask-ml/register-model-service';

export type RegisterModelArgs = {
  modelUid?: string;
  serverAddress: string;
  serverPort: number;
};

export type UnregisterModelArgs = {
  modelUid: string;
};

export type GetModelAppStatusArgs = {
  modelUid: string;
};

export type GetModelServerArgs = GetModelAppStatusArgs;

const registerModelAppIp = async (_event: any, arg: RegisterModelArgs) => {
  if (!arg.modelUid) {
    return RegisterModelService.registerModel(
      arg.serverAddress,
      arg.serverPort,
    ).then(getRaw);
  }
  log.info(
    `Updating registration info for ${arg.modelUid} at ${arg.serverAddress}:${arg.serverPort}`,
  );
  await ModelServer.updateServer(
    arg.modelUid,
    arg.serverAddress,
    arg.serverPort,
  );
  const server = await ModelServer.getServerByModelUid(arg.modelUid);
  if (!server) {
    throw new Error(`FATAL: Server not found for model ${arg.modelUid}`);
  }
  return getRaw(server);
};

const unregisterModelAppIp = async (_event: any, arg: UnregisterModelArgs) => {
  log.info(`Unregistering model ${arg.modelUid}`);
  return ModelServer.unregisterServer(arg.modelUid);
};

const getModelServers = async () => {
  return ModelServer.getAllServers().then((servers) => servers.map(getRaw));
};

const getModelServer = async (event: any, arg: GetModelServerArgs) => {
  return ModelServer.getServerByModelUid(arg.modelUid).then(getRaw);
};

const getModelAppStatus = async (
  _event: any,
  arg: GetModelAppStatusArgs,
): Promise<ModelAppStatus> => {
  const server = await ModelServer.getServerByModelUid(arg.modelUid);
  if (!server) {
    log.error(`Server not found for model ${arg.modelUid}`);
    throw new Error('Server not found');
  }
  if (!server.isUserConnected) {
    return ModelAppStatus.Unregistered;
  }
  const taskService = await ModelAppService.init(arg.modelUid);
  const healthBool = await taskService.pingHealth();
  server.isUserConnected = healthBool;
  await server.save();
  return healthBool ? ModelAppStatus.Online : ModelAppStatus.Offline;
};

export {
  registerModelAppIp,
  unregisterModelAppIp,
  getModelAppStatus,
  getModelServers,
  getModelServer,
};
