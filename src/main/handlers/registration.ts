import { ModelAppStatus } from 'src/shared/models';
import ModelServer from '../models/model-server';
import { getRaw } from '../util';

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

const getModelServers = async (): Promise<ModelServer[]> => {
  return ModelServer.getAllServers();
};

const getModelAppStatus = async (
  _event: any,
  _arg: GetModelAppStatusArgs,
): Promise<ModelAppStatus> => {
  const model = await ModelServer.getServerByModelUid(_arg.modelUid);
  if (!model) {
    return ModelAppStatus.Unregistered;
  }
  // mocked to always return online
  // return fetch(
  //   `http://${model.serverAddress}:${model.serverPort}${SERVER_HEALTH_SLUG}`,
  // )
  //   .then((res) => res.status)
  //   .then((status) => {
  //     if (status === 200) {
  //       return ModelAppStatus.Online;
  //     }
  //     return ModelAppStatus.Offline;
  //   });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ModelAppStatus.Online);
    }, 2000);
  });
};
export {
  registerModelAppIp,
  unregisterModelAppIp,
  getModelAppStatus,
  getModelServers,
};
