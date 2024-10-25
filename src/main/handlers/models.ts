import MLModelDb from '../models/ml-model';
import { getRaw } from '../util';

export type GetModelByIdArgs = {
  modelUid: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getModels(_event: any, _arg: any) {
  return MLModelDb.findAll().then((modelsDb) => modelsDb.map(getRaw));
}

export async function getModelByUid(event: any, arg: GetModelByIdArgs) {
  return MLModelDb.getModelByUid(arg.modelUid).then(getRaw);
}
