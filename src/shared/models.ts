import { InferAttributes } from 'sequelize/types/model';
import JobDb from 'src/main/models/job';
import MLModelDb from 'src/main/models/ml-model';
import ModelServerDb from 'src/main/models/model-server';
import { RequestBody } from './generated_models';

export type MLModel = InferAttributes<MLModelDb>;

export type Job = InferAttributes<JobDb>;

export type ModelServer = InferAttributes<ModelServerDb>;

export enum ModelAppStatus {
  Online = 'Online',
  Offline = 'Offline',
  Error = 'Error',
  Unregistered = 'Unregistered',
}

export type RunJobArgs = {
  modelUid: string;
  order: number;
  requestBody: RequestBody;
};
