/* eslint-disable max-classes-per-file */
import { ModelInfo } from 'src/shared/models';
import { Inputs, Outputs, Parameters } from '../models/job';

type ModelServerInfo = {
  serverAddress: string;
  serverPort: number;
};

type InferenceArgs = {
  inputs: Inputs;
  outputs: Outputs;
  parameters: Parameters;
  server: ModelServerInfo;
};

export class SuccessResponse {
  data: object;

  constructor(data: object) {
    this.data = data;
  }
}

export class ErrorResponse {
  error: object[];

  constructor(error: object[]) {
    this.error = error;
  }
}

export default interface InferenceService {
  pingHealth(server: ModelServerInfo): Promise<boolean>;
  runInference(
    args: InferenceArgs,
    signal: AbortSignal,
  ): Promise<SuccessResponse | ErrorResponse>;
  fetchModelInfo(server: ModelServerInfo): Promise<ModelInfo | null>;
}

export { InferenceArgs, ModelServerInfo };
