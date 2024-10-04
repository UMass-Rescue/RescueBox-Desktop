/* eslint-disable class-methods-use-this */
import InferenceService, {
  ErrorResponse,
  InferenceArgs,
  ModelServerInfo,
  SuccessResponse,
} from '../inference-service';

class TenSecondModelService implements InferenceService {
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

  // eslint-disable-next-line class-methods-use-this
  public async runInference(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    args: InferenceArgs,
  ): Promise<SuccessResponse | ErrorResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          new SuccessResponse({
            output: 'SuperSmashingGreat!',
          }),
        );
      }, 10000);
    });
  }
}

export default TenSecondModelService;
