import { InferAttributes } from 'sequelize/types/model';
import JobDb from 'src/main/models/job';
import MLModelDb from 'src/main/models/ml-model';
import ModelServerDb from 'src/main/models/model-server';

export type MLModel = InferAttributes<MLModelDb>;

export type Job = InferAttributes<JobDb>;

export type ModelServer = InferAttributes<ModelServerDb>;

export enum ModelAppStatus {
  Online = 'Online',
  Offline = 'Offline',
  Error = 'Error',
  Unregistered = 'Unregistered',
}

export type ModelInfo = {
  uid: string;
  name: string;
  version: string;
  author: string;
  lastUpdated: Date;
  description: string;
  parameters: { name: string; type: string; description: string }[];
  inputTypes: { type: string; description: string }[];
  outputTypes: { type: string; description: string }[];
  constraints: { name: string; description: string }[];
};
