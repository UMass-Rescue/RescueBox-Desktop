type ModelServerInfo = {
  serverAddress: string;
  serverPort: number;
};

type InferenceArgs = {
  inputDir: string;
  outputDir: string;
  parameters: object;
};

export default interface InferenceService {
  getModelServerInfo(): Promise<ModelServerInfo>;
  getModelInfo(): Promise<JSON>;
  runInference(args: InferenceArgs): Promise<JSON>;
}

export { InferenceArgs, ModelServerInfo };
