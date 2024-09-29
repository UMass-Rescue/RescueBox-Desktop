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
  status: string;
};

type Job = {
  uid: string;
  modelUid: string;
  startTime: string;
  endTime: string;
  status: string;
  inputDir: string;
  outputDir: string;
  parameters: string;
  logOutput: string;
};

export { Model, Job };
