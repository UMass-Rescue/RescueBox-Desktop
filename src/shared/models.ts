import { InferAttributes } from 'sequelize/types/model';
import InferenceService from 'src/main/model-apps/inference-service';
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

export enum DataType {
  Image = 'Image',
  Video = 'Video',
  Audio = 'Audio',
  Text = 'Text',
  Directory = 'Directory',
  Path = 'Path',
}

export type ModelAppConfig = {
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
  service: InferenceService;
};

export type Inputs = { path: string; path_key: string }[];
export type Outputs = { path: string; path_key: string }[];
export type Parameters = { [key: string]: any }[];

export type RunJobArgs = {
  modelUid: string;
  inputs: Inputs;
  outputs: Outputs;
  parameters: Parameters;
};
