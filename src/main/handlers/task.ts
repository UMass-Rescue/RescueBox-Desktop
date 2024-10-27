import { SchemaAPIRoute } from 'src/shared/generated_models';
import getTaskServiceByModelUid from '../flask-ml/task-service';

export type GetApiRoutesArgs = {
  modelUid: string;
};

export type GetInfoArgs = {
  modelUid: string;
};

export type GetTaskSchemaArgs = {
  modelUid: string;
  order: number;
};

const getApiRoutes = async (
  _event: any,
  arg: GetApiRoutesArgs,
): Promise<SchemaAPIRoute[]> => {
  const service = await getTaskServiceByModelUid(arg.modelUid);
  return service.getApiRoutes();
};

const getInfo = async (_event: any, arg: GetInfoArgs) => {
  const service = await getTaskServiceByModelUid(arg.modelUid);
  return service.getInfo();
};

const getTaskSchema = async (_event: any, arg: GetTaskSchemaArgs) => {
  const service = await getTaskServiceByModelUid(arg.modelUid);
  return service.getTaskSchema(arg.order);
};

export { getApiRoutes, getInfo, getTaskSchema };
