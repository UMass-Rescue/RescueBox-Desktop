export type CreateJobArgs = {
  modelUid: string;
  inputDir: string;
  outputDir: string;
  parameters: string;
};

const createJob = async (event: any, arg: CreateJobArgs) => {
  return arg;
};

export { createJob };
