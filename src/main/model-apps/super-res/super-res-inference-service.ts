import log from 'electron-log';
import InferenceService, { InferenceArgs } from '../inference-service';

class SuperResInferenceService implements InferenceService {
  // eslint-disable-next-line class-methods-use-this
  public async runInference(args: InferenceArgs): Promise<object> {
    const { serverAddress, serverPort } = args.server;
    const body = {
      inputDir: args.inputs[0].path,
      outputDir: args.outputs[0].path,
      parameters: args.parameters,
    };

    // return fetch(`http://${serverAddress}:${serverPort}/run-inference`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(body),
    // }).then((res) => {
    //   if (!res.ok) {
    //     log.error(`Job failed to execute. ${res}`);
    //     throw new Error(
    //       'Job failed to execute. Make sure the server is running before starting a job.',
    //     );
    //   }
    //   log.info(`Job has been completed. Here are the results: ${res}`);
    //   return res.json();
    // });
    return new Promise((resolve) => {
      resolve({
        status: 'success',
        outputDir: args.outputs[0].path,
      });
    });
  }
}

export default SuperResInferenceService;
