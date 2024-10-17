import { ModelAppStatus } from 'src/shared/models';
import log from 'electron-log/main';
import { InfoPage } from 'src/shared/schema-types';
import ModelServer from '../models/model-server';
import { getRaw } from '../util';
import getTaskServiceByModelUid from '../flask-ml/task-service';

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
  const taskService = await getTaskServiceByModelUid(arg.modelUid);
  return (
    taskService
      .getInfo()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((res: InfoPage) => ModelAppStatus.Online)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((_err) => ModelAppStatus.Offline)
  );
};

export {
  registerModelAppIp,
  unregisterModelAppIp,
  getModelAppStatus,
  getModelServers,
};
