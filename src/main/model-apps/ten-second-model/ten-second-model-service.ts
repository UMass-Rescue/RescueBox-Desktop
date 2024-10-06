/* eslint-disable class-methods-use-this */
import { ModelInfo } from 'src/shared/models';
import InferenceService, {
  ErrorResponse,
  InferenceArgs,
  ModelServerInfo,
  SuccessResponse,
} from '../inference-service';

class TenSecondModelService implements InferenceService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pingHealth(server: ModelServerInfo): Promise<boolean> {
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

  public async fetchModelInfo(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    server: ModelServerInfo,
  ): Promise<ModelInfo | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          uid: 'dummy-1',
          name: 'Ten Second Model',
          version: '0.8.5',
          author: 'Jane Smith',
          lastUpdated: new Date('2023-11-15T14:30:00Z'),
          parameters: [
            { name: 'param1', type: 'number', description: 'Parameter 1' },
          ],
          inputTypes: [{ type: 'image', description: 'Input image' }],
          outputTypes: [{ type: 'image', description: 'Output image' }],
          constraints: [{ name: 'constraint1', description: 'Constraint 1' }],
        } as ModelInfo);
      }, 2000);
    });
  }
}

export default TenSecondModelService;
