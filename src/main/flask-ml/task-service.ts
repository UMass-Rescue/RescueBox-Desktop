import { ModelServer } from 'src/shared/models';
import {
  InfoPage,
  TaskSchema,
  RequestBody,
  ResponseBody,
  SchemaAPIRoute,
} from 'src/shared/generated_models';
import apiRoutes from 'src/shared/dummy_data/api_routes';
import markdownResponseBody from 'src/shared/dummy_data/markdown_response';
import infoPage from 'src/shared/dummy_data/info_page';
import taskSchema4 from 'src/shared/dummy_data/task_schema4';
import ModelServerDb from '../models/model-server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const INFO_SLUG = '/info';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const API_ROUTES_SLUG = '/api/routes';

class TaskService {
  private serverAddress: string;

  private serverPort: number;

  private apiRoutes: SchemaAPIRoute[] = [];

  private abortController: AbortController | null = null;

  constructor(server: ModelServer) {
    this.serverAddress = server.serverAddress;
    this.serverPort = server.serverPort;
  }

  private async initializeAPIRoutes(): Promise<void> {
    // this.apiRoutes = await fetch(
    //   `http://${this.serverAddress}:${this.serverPort}${API_ROUTES_SLUG}`,
    // )
    //   .then((res) => {
    //     if (res.status !== 200) {
    //       throw new Error('Failed to fetch info.');
    //     }
    //     return res.json();
    //   })
    //   .then((data: APIRoutes) =>
    //     data.filter((apiRoute) => 'order' in apiRoute),
    //   );
    this.apiRoutes = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(apiRoutes.filter((apiRoute) => 'order' in apiRoute));
      }, 1000);
    });
  }

  public async getApiRoutes(): Promise<SchemaAPIRoute[]> {
    if (this.apiRoutes.length === 0) {
      await this.initializeAPIRoutes();
    }
    return this.apiRoutes;
  }

  // eslint-disable-next-line class-methods-use-this
  public async getInfo(): Promise<InfoPage> {
    // return fetch(`http://${this.serverAddress}:${this.serverPort}${INFO_SLUG}`)
    //   .then((res) => {
    //     if (res.status !== 200) {
    //       throw new Error('Failed to fetch info.');
    //     }
    //     return res.json();
    //   })
    //   .then((data: InfoPage) => data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(infoPage);
      }, 1000);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public async runTask(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    taskId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    requestBody: RequestBody,
  ): Promise<ResponseBody> {
    // this.abortController = new AbortController();
    // const { signal } = this.abortController;
    // const task = this.apiRoutes.find((route) => String(route.order) === taskId);
    // if (!task) {
    //   throw new Error('Task not found');
    // }
    // return fetch(
    //   `http://${this.serverAddress}:${this.serverPort}${task.run_task}`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(requestBody),
    //     signal,
    //   },
    // )
    //   .then((res) => {
    //     if (res.status !== 200) {
    //       throw new Error('Failed to run task.');
    //     }
    //     return res.json();
    //   })
    //   .then((data: ResponseBody) => data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(markdownResponseBody);
      }, 1000);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public async cancelTask(): Promise<void> {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  public async getTaskSchema(taskId: string): Promise<TaskSchema> {
    // const task = this.apiRoutes.find((route) => String(route.order) === taskId);
    // if (!task) {
    //   throw new Error('Task not found');
    // }
    // if ('task_schema' in task === false) {
    //   throw new Error('This task does not have a schema.');
    // }
    // return fetch(
    //   `http://${this.serverAddress}:${this.serverPort}${task.task_schema}`,
    // )
    //   .then((res) => {
    //     if (res.status !== 200) {
    //       throw new Error('Failed to fetch task schema.');
    //     }
    //     return res.json();
    //   })
    //   .then((data: TaskSchema) => data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(taskSchema4);
      }, 1000);
    });
  }
}

const getTaskServiceByModelUid = async (
  modelUid: string,
): Promise<TaskService> => {
  const server = await ModelServerDb.getServerByModelUid(modelUid);
  if (!server) {
    throw new Error(`Server not found for model ${modelUid}`);
  }
  return new TaskService(server);
};

export default getTaskServiceByModelUid;
