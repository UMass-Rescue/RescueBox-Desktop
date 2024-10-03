/**
 * @deprecated Use {@link src/shared/models/MLModel} instead
 */
type Model = {
  id: number;
  uid: string;
  name: string;
  version: string;
  author: string;
  lastUpdated: string;
  input: string;
  inputTypes: string;
  outputTypes: string;
  parameters: string;
  constraints: string;
  ip: string;
  port: number;
  status: string;
};

/**
 * @deprecated Use {@link src/shared/models/Job} instead
 */
type Job = {
  uid: string;
  modelUid: string;
  startTime: string;
  endTime: null | string;
  status: string;
  inputDir: string;
  outputDir: string;
  parameters: string;
  logOutput: string;
};

export { Model, Job };
