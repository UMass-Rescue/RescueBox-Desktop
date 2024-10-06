import { ModelAppStatus, ModelInfo } from 'src/shared/models';
import ModelServer from '../models/model-server';
import { getRaw } from '../util';
import { getServiceByModelUid } from '../model-apps/config';
import JobManager from '../model-apps/inference-task';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SERVER_HEALTH_SLUG = '/health';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MODEL_APP_INFO_SLUG = '/info';

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

export type GetModelInfoArgs = {
  modelUid: string;
};

const registerModelAppIp = async (event: any, arg: RegisterModelArgs) => {
  return ModelServer.registerServer(
    arg.modelUid,
    arg.serverAddress,
    arg.serverPort,
  ).then(getRaw);
};

const unregisterModelAppIp = async (event: any, arg: UnregisterModelArgs) => {
  return ModelServer.deleteServer(arg.modelUid);
};

const getModelServers = async () => {
  return ModelServer.getAllServers().then((servers) => servers.map(getRaw));
};

const getModelAppStatus = async (
  _event: any,
  arg: GetModelAppStatusArgs,
): Promise<ModelAppStatus> => {
  const server = await ModelServer.getServerByModelUid(arg.modelUid);
  if (!server) {
    return ModelAppStatus.Unregistered;
  }
  const manager = new JobManager(getServiceByModelUid(arg.modelUid));
  return manager.pingHealth(server).then((isOnline) => {
    if (isOnline) {
      return ModelAppStatus.Online;
    }
    return ModelAppStatus.Offline;
  });
};

const getModelInfo = async (
  _event: any,
  arg: GetModelInfoArgs,
): Promise<ModelInfo> => {
  const server = await ModelServer.getServerByModelUid(arg.modelUid);
  if (!server) {
    throw new Error(`Server not found for model ${arg.modelUid}.`);
  }
  const manager = new JobManager(getServiceByModelUid(arg.modelUid));
  return manager.fetchModelInfo(server).then((data) => {
    return data as ModelInfo;
  });
};

export {
  registerModelAppIp,
  unregisterModelAppIp,
  getModelAppStatus,
  getModelServers,
  getModelInfo,
};
