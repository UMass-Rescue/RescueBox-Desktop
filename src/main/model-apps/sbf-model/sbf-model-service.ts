/* eslint-disable class-methods-use-this */
import log from 'electron-log/main';
import InferenceService, {
  ErrorResponse,
  InferenceArgs,
  ModelServerInfo,
  SuccessResponse,
} from '../inference-service';

// const SERVER_HEALTH_SLUG = '/execute';

// TODO: Replace this with your own model service implementation
class SBFModelService implements InferenceService {
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
    const { serverAddress, serverPort } = args.server;
    const targetFolder = args.inputs.filter(
      (input) => input.path_key === 'Target Dataset',
    )[0].path;
    const knownFolder = args.inputs.filter(
      (input) => input.path_key === 'Known Dataset',
    )[0].path;
    const outputFolder = args.outputs.filter(
      (output) => output.path_key === 'SQL Database',
    )[0].path;
    const parameters: Record<string, any> = {};
    args.parameters.forEach((param) => {
      // eslint-disable-next-line prefer-destructuring
      parameters[Object.keys(param)[0]] = Number(Object.values(param)[0]);
    });
    const body = {
      inputs: [
        {
          input: {
            input_type: 'TARGET_FOLDER',
            file_path: targetFolder,
          },
        },
        {
          input: {
            input_type: 'KNOWN_DATASET',
            file_path: knownFolder,
          },
        },
        {
          input: {
            input_type: 'OUTPUT_SQL_PATH',
            file_path: outputFolder,
          },
        },
      ],
      data_type: 'CUSTOM',
      parameters: {
        block_size: parameters.blockSizeInKiB,
        target_probability: parameters.targetProbability,
      },
    };

    return fetch(`http://${serverAddress}:${serverPort}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal,
    })
      .then(async (res) => {
        log.info('Received a response from the server.');
        if (!res.ok) {
          log.error(`Job failed to execute.statusText ${res.statusText}`);
          log.error(`Job failed to execute.status ${res.status}`);
          log.error(`Job failed to execute.body ${res.body}`);
          return new ErrorResponse([{ message: res.statusText }]);
        }
        log.info(`Job has been completed. Here are the results:\n ${res}`);
        return new SuccessResponse(await res.json());
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          log.info('Job has been canceled.');
          return new ErrorResponse([{ message: 'Job has been canceled.' }]);
        }
        log.error(`Job failed to execute. ${error}`);
        return new ErrorResponse([{ message: error.message }]);
      });
  }
}

export default SBFModelService;
