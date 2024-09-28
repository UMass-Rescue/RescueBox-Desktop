/* eslint-disable @typescript-eslint/no-unused-vars */
export type ModelAppStatus = 'online' | 'offline' | 'error';

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
  return arg;
};
const unregisterModelAppIp = async (event: any, arg: UnregisterModelArgs) => {
  return arg;
};
const getModelAppStatus = async (
  _event: any,
  _arg: GetModelAppStatusArgs,
): Promise<ModelAppStatus> => {
  return 'online';
};
export { registerModelAppIp, unregisterModelAppIp, getModelAppStatus };
