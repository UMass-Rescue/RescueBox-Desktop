import { ModelAppStatus } from 'src/shared/models';
import log from 'electron-log/main';
import ModelServer from '../models/model-server';
import { getRaw } from '../util';
import getTaskServiceByModelUid from '../flask-ml/task-service';
import { InfoPage } from 'src/shared/schema-types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SERVER_HEALTH_SLUG = '/health';

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

const registerModelAppIp = async (event: any, arg: RegisterModelArgs) => {
  log.info(
    `Registering model ${arg.modelUid} at ${arg.serverAddress}:${arg.serverPort}`,
  );
  return ModelServer.registerServer(
    arg.modelUid,
    arg.serverAddress,
    arg.serverPort,
  ).then(getRaw);
};

const unregisterModelAppIp = async (event: any, arg: UnregisterModelArgs) => {
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
  const taskService = await getTaskServiceByModelUid(arg.modelUid);
  return taskService.getInfo()
  .then((res: InfoPage) =>  ModelAppStatus.Online)
  .catch((err) => ModelAppStatus.Offline);
};

export {
  registerModelAppIp,
  unregisterModelAppIp,
  getModelAppStatus,
  getModelServers,
};
