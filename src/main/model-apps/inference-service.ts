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

export default interface InferenceService {
  runInference(args: InferenceArgs): Promise<object>;
}

// export class RunningJobs {
//   // eslint-disable-next-line no-use-before-define
//   static #instance: RunningJobs = new RunningJobs();

//   #jobs: { [key: string]: Promise<any> } = {};

//   static getInstance() {
//     // eslint-disable-next-line no-use-before-define
//     if (!RunningJobs.#instance) {
//       RunningJobs.#instance = new RunningJobs();
//     }
//     return RunningJobs.#instance;
//   }

//   addJob(uid: string, job: Promise<any>) {
//     this.#jobs[uid] = job;
//   }

//   getJobById(uid: string) {
//     return this.#jobs[uid];
//   }

//   deleteJob(uid: string) {
//     delete this.#jobs[uid];
//   }
// }

export { InferenceArgs, ModelServerInfo };
