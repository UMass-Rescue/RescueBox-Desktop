/* eslint-disable @typescript-eslint/no-unused-vars */
import { ModelAppStatus } from 'src/shared/models';
import log from 'electron-log/main';
import { ModelInfo } from 'src/shared/generated_models';
import ModelServer from '../models/model-server';
import { getRaw } from '../util';
import ModelAppService from '../flask-ml/model-app-service';

export type RegisterModelArgs = {
  modelUid: string;
  serverAddress: string;
  serverPort: number;
};

export type UnregisterModelArgs = {
  modelUid: string;
};

export type GetModelAppStatusArgs = {
  modelUid: string;
};

const registerModelAppIp = async (_event: any, arg: RegisterModelArgs) => {
  log.info(
    `Registering model ${arg.modelUid} at ${arg.serverAddress}:${arg.serverPort}`,
  );
  return ModelServer.registerServer(
    arg.modelUid,
    arg.serverAddress,
    arg.serverPort,
  ).then(getRaw);
};

const unregisterModelAppIp = async (_event: any, arg: UnregisterModelArgs) => {
  log.info(`Unregistering model ${arg.modelUid}`);
  return ModelServer.unregisterServer(arg.modelUid);
};

const getModelServers = async () => {
  return ModelServer.getAllServers().then((servers) => servers.map(getRaw));
};

const getModelAppStatus = async (
  _event: any,
  arg: GetModelAppStatusArgs,
): Promise<ModelAppStatus> => {
  const server = await ModelServer.getServerByModelUid(arg.modelUid);
  if (!server || !server.isUserConnected) {
    return ModelAppStatus.Unregistered;
  }
  const taskService = await ModelAppService.init(arg.modelUid);
  return taskService
    .getInfo()
    .then((res: ModelInfo) => ModelAppStatus.Online)
    .catch((_err) => ModelAppStatus.Offline);
};

export {
  registerModelAppIp,
  unregisterModelAppIp,
  getModelAppStatus,
  getModelServers,
};
