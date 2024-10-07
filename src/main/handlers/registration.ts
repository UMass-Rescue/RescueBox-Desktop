import { ModelAppStatus } from 'src/shared/models';
import log from 'electron-log/main';
import ModelServer from '../models/model-server';
import { getRaw } from '../util';
import { getInferenceTaskByModelUid } from '../model-apps/config';

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
  return ModelServer.deleteServer(arg.modelUid);
};

const getModelServers = async () => {
  log.info('Getting all servers from the database');
  return ModelServer.getAllServers().then((servers) => servers.map(getRaw));
};

const getModelAppStatus = async (
  _event: any,
  arg: GetModelAppStatusArgs,
): Promise<ModelAppStatus> => {
  log.info('Getting model app status', arg.modelUid);
  const server = await ModelServer.getServerByModelUid(arg.modelUid);
  if (!server) {
    return ModelAppStatus.Unregistered;
  }
  const manager = getInferenceTaskByModelUid(arg.modelUid);
  return manager.pingHealth(server).then((isOnline) => {
    if (isOnline) {
      return ModelAppStatus.Online;
    }
    return ModelAppStatus.Offline;
  });
};

export {
  registerModelAppIp,
  unregisterModelAppIp,
  getModelAppStatus,
  getModelServers,
};
