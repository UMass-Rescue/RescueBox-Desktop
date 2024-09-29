import ModelServer from '../models/model-server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SERVER_HEALTH_SLUG = '/health';

/* eslint-disable @typescript-eslint/no-unused-vars */
export enum ModelAppStatus {
  Online = 'Online',
  Offline = 'Offline',
  Error = 'Error',
}

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
  );
};
const unregisterModelAppIp = async (event: any, arg: UnregisterModelArgs) => {
  return ModelServer.deleteServer(arg.modelUid);
};
const getModelAppStatus = async (
  _event: any,
  _arg: GetModelAppStatusArgs,
): Promise<ModelAppStatus> => {
  const model = await ModelServer.getServerByModelUid(_arg.modelUid);
  if (!model) {
    return ModelAppStatus.Offline;
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
  return ModelAppStatus.Online;
};
export { registerModelAppIp, unregisterModelAppIp, getModelAppStatus };
