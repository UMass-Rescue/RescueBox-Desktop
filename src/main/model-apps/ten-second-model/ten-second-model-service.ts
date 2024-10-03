// import log from 'electron-log';
import InferenceService, {
  ErrorResponse,
  InferenceArgs,
  SuccessResponse,
} from '../inference-service';

class TenSecondModelService implements InferenceService {
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