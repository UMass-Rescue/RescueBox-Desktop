import { ModelAppStatus } from 'src/shared/models';
import ModelServer from '../models/model-server';
import { getRaw } from '../util';
import { getServiceByModelUid } from '../model-apps/config';

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
  const service = getServiceByModelUid(arg.modelUid);
  return service.pingHealth(server).then((isOnline) => {
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
