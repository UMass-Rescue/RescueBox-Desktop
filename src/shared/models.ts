import { Inputs, JobStatus, Outputs, Parameters } from 'src/main/models/job';

export type MLModel = {
  uid: string;
  name: string;
  version: string;
  author: string;
  lastUpdated: Date;
};

export type Job = {
  uid: string;
  modelUid: string;
  startTime: Date;
  endTime: Date;
  status: JobStatus;
  inputs: Inputs;
  outputs: Outputs;
  parameters: Parameters;
  response: object;
};

export type ModelServer = {
  modelUid: string;
  serverAddress: string;
  serverPort: number;
};

export enum ModelAppStatus {
  Online = 'Online',
  Offline = 'Offline',
  Error = 'Error',
  Unregistered = 'Unregistered',
}
