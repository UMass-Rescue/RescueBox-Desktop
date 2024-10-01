import ModelServer from 'src/main/models/model-server';
import log from 'electron-log';
import InferenceService, {
  InferenceArgs,
  ModelServerInfo,
} from '../inference-service';

class SuperResInferenceService implements InferenceService {
  private modelUid: string;

  constructor(modelUid: string) {
    this.modelUid = modelUid;
  }

  public async getModelServerInfo(): Promise<ModelServerInfo> {
    const server = await ModelServer.getServerByModelUid(this.modelUid);
    if (!server) {
      throw new Error('Model server is not connected.');
    }

    return {
      serverAddress: server.serverAddress,
      serverPort: server.serverPort,
    };
  }

  public async getModelInfo(): Promise<JSON> {
    const { serverAddress, serverPort } = await this.getModelServerInfo();
    const response = await fetch(`http://${serverAddress}:${serverPort}/info`);
    if (!response.ok) {
      throw new Error(`Failed to fetch model info: ${response.statusText}`);
    }
    return response.json();
  }

  public async runInference(args: InferenceArgs): Promise<JSON> {
    const { serverAddress, serverPort } = await this.getModelServerInfo();
    return fetch(`http://${serverAddress}:${serverPort}/run-inference`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            'Job failed to execute. Make sure the server is running before starting a job.',
          );
        }
        log.info(`Job has been completed. Here are the results: ${res}`);
        return res.json();
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}

export default SuperResInferenceService;
