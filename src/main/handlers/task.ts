import { SchemaAPIRoute } from 'src/shared/generated_models';
import ModelAppService from '../flask-ml/model-app-service';
import TaskDb from '../models/tasks';
import { getRaw } from '../util';

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

export type GetTaskByModelUidAndTaskIdArgs = GetTaskSchemaArgs;

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

const getTaskByModelUidAndTaskId = async (
  _event: any,
  arg: GetTaskByModelUidAndTaskIdArgs,
) => {
  return TaskDb.getTaskByModelUidAndTaskId(arg.taskId, arg.modelUid).then(
    getRaw,
  );
};

export { getApiRoutes, getInfo, getTaskSchema, getTaskByModelUidAndTaskId };
