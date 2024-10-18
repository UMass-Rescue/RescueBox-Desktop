import { APIRoutes } from 'src/shared/schema-types';
import getTaskServiceByModelUid from '../flask-ml/task-service';

export type GetApiRoutesArgs = {
  modelUid: string;
};

export type GetInfoArgs = {
  modelUid: string;
};

export type GetTaskSchemaArgs = {
  modelUid: string;
  taskRoute: string;
};

const getApiRoutes = async (
  _event: any,
  arg: GetApiRoutesArgs,
): Promise<APIRoutes> => {
  const service = await getTaskServiceByModelUid(arg.modelUid);
  return service.getApiRoutes();
};

const getInfo = async (_event: any, arg: GetInfoArgs) => {
  const service = await getTaskServiceByModelUid(arg.modelUid);
  return service.getInfo();
};

const getTaskSchema = async (_event: any, arg: GetTaskSchemaArgs) => {
  const service = await getTaskServiceByModelUid(arg.modelUid);
  return service.getTaskSchema(arg.taskRoute);
};

export { getApiRoutes, getInfo, getTaskSchema };
