import { SchemaAPIRoute } from 'src/shared/generated_models';
import ModelAppService from '../flask-ml/model-app-service';

export type GetApiRoutesArgs = {
  modelUid: string;
};

export type GetInfoArgs = {
  modelUid: string;
};

export type GetTaskSchemaArgs = {
  modelUid: string;
  taskId: string;
};

const getApiRoutes = async (
  _event: any,
  arg: GetApiRoutesArgs,
): Promise<SchemaAPIRoute[]> => {
  const service = await ModelAppService.init(arg.modelUid);
  return service.getApiRoutes();
};

const getInfo = async (_event: any, arg: GetInfoArgs) => {
  const service = await ModelAppService.init(arg.modelUid);
  return service.getInfo();
};

const getTaskSchema = async (_event: any, arg: GetTaskSchemaArgs) => {
  const service = await ModelAppService.init(arg.modelUid);
  return service.getTaskSchema(arg.taskId);
};

export { getApiRoutes, getInfo, getTaskSchema };
