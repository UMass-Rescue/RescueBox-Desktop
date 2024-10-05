/* eslint-disable class-methods-use-this */
// import log from 'electron-log';
import InferenceService, {
  ErrorResponse,
  InferenceArgs,
  ModelServerInfo,
  SuccessResponse,
} from '../inference-service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SERVER_HEALTH_SLUG = '/health';

class SuperResInferenceService implements InferenceService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pingHealth(_server: ModelServerInfo): Promise<boolean> {
    // return fetch(
    //   `http://${model.serverAddress}:${model.serverPort}${SERVER_HEALTH_SLUG}`,
    // )
    //   .then((res) => res.status)
    //   .then((status) => {
    //     if (status === 200) {
    //       return true;
    //     }
    //     return false;
    //   });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  }

  public async runInference(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    args: InferenceArgs,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    signal: AbortSignal,
  ): Promise<SuccessResponse | ErrorResponse> {
    // const { serverAddress, serverPort } = args.server;
    // const body = {
    //   inputDir: args.inputs[0].path,
    //   outputDir: args.outputs[0].path,
    //   parameters: args.parameters,
    // };
    //
    // return fetch(`http://${serverAddress}:${serverPort}/run-inference`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(body),
    //   signal,
    // })
    //   .then((res) => {
    //     if (!res.ok) {
    //       log.error(`Job failed to execute. ${res}`);
    //       return new ErrorResponse([{ message: res.statusText }]);
    //     }
    //     log.info(`Job has been completed. Here are the results:\n ${res}`);
    //     return new SuccessResponse(res.json());
    //   })
    //   .catch((error) => {
    //     if (error.name === 'AbortError') {
    //       log.info('Job has been canceled.');
    //       return new ErrorResponse([{ message: 'Job has been canceled.' }]);
    //     }
    //     log.error(`Job failed to execute. ${error}`);
    //     return new ErrorResponse([{ message: error.message }]);
    //   });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          new SuccessResponse({
            output: 'SuperSmashingGreat!',
          }),
        );
      }, 1000);
    });
  }
}

export default SuperResInferenceService;
