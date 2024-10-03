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

export { Job };
