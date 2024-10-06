import log from 'electron-log';
import { ModelInfo } from 'src/shared/models';
import InferenceService, {
  InferenceArgs,
  SuccessResponse,
  ErrorResponse,
  ModelServerInfo,
} from './inference-service';

class InferenceTask {
  private abortController: AbortController | null = null;

  private service: InferenceService;

  constructor(service: InferenceService) {
    this.service = service;
  }

  public async runInference(
    args: InferenceArgs,
  ): Promise<SuccessResponse | ErrorResponse> {
    this.abortController = new AbortController();
    const { signal } = this.abortController;

    return this.service.runInference(args, signal).finally(() => {
      this.abortController = null;
    });
  }

  public cancelInference(): void {
    if (this.abortController) {
      this.abortController.abort();
      log.info('Job has been canceled');
    }
  }

  public async pingHealth(server: ModelServerInfo): Promise<boolean> {
    return this.service.pingHealth(server);
  }

  public async fetchModelInfo(
    server: ModelServerInfo,
  ): Promise<ModelInfo | null> {
    return this.service.fetchModelInfo(server);
  }
}

export default InferenceTask;
