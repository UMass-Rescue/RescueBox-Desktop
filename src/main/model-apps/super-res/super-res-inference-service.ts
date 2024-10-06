/* eslint-disable class-methods-use-this */
// import log from 'electron-log';
import { ModelInfo } from 'src/shared/models';
import InferenceService, {
  ErrorResponse,
  InferenceArgs,
  ModelServerInfo,
  SuccessResponse,
} from '../inference-service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SERVER_HEALTH_SLUG = '/health';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MODEL_APP_INFO_SLUG = '/info';

class SuperResInferenceService implements InferenceService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pingHealth(server: ModelServerInfo): Promise<boolean> {
    // return fetch(
    //   `http://${server.serverAddress}:${server.serverPort}${SERVER_HEALTH_SLUG}`,
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

  public async fetchModelInfo(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    server: ModelServerInfo,
  ): Promise<ModelInfo | null> {
    // return fetch(
    //   `http://${server.serverAddress}:${server.serverPort}${MODEL_APP_INFO_SLUG}`,
    // )
    //   .then((res) => {
    //     if (res.status !== 200) {
    //       log.error(`Failed to fetch model info: ${res.statusText}`);
    //       return null;
    //     }
    //     return res.json() as Promise<ModelInfo>;
    //   })
    //   .catch((error) => {
    //     log.error(`Failed to fetch model info: ${error}`);
    //     return null;
    // });
    return {
      uid: 'model1',
      name: 'Image Super Resolution',
      version: '1.0.0',
      author: 'John Doe',
      lastUpdated: new Date('2023-10-01T12:00:00Z'),
      description: 'This model upscales images to a higher resolution.',
      parameters: [
        {
          name: 'Scale',
          type: 'Number',
          description:
            'The factor by which to upscale the image (between 1 and 4).',
        },
      ],
      inputTypes: [
        {
          type: 'Image(s)',
          description: 'The images to be upscaled.',
        },
      ],
      outputTypes: [
        {
          type: 'Image(s)',
          description: 'The upscaled images.',
        },
      ],
      constraints: [
        {
          name: 'Minimum Scale',
          description: 'The minimum scale factor is 1.',
        },
        {
          name: 'Maximum Scale',
          description: 'The maximum scale factor is 4.',
        },
      ],
    } as ModelInfo;
  }
}

export default SuperResInferenceService;
