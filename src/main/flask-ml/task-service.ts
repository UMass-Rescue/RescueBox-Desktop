import { ModelServer } from 'src/shared/models';
import {
  APIRoutes,
  InfoPage,
  TaskSchema,
  RequestBody,
  ResponseBody,
} from 'src/shared/generated_models';
import ModelServerDb from '../models/model-server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const INFO_SLUG = '/info';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const API_ROUTES_SLUG = '/api/routes';

class TaskService {
  private serverAddress: string;

  private serverPort: number;

  private apiRoutes: APIRoutes = [];

  private abortController: AbortController | null = null;

  constructor(server: ModelServer) {
    this.serverAddress = server.serverAddress;
    this.serverPort = server.serverPort;
    this.initializeAPIRoutes();
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
    //   .then((data: APIRoutes) => data);
    this.apiRoutes = await new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            task_schema: '/tasks/face_match/task_schema',
            run_task: '/tasks/face_match',
            payload_schema: '/tasks/face_match/payload_schema',
            short_title: 'Face Match',
            order: 1,
          },
        ]);
      }, 2000);
    });
  }

  public async getApiRoutes(): Promise<APIRoutes> {
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
        resolve({
          info: '# Welcome to the Face Match App\n\nThis app will help you to match faces in your images...',
          author: 'John Doe',
          version: '1.0.0',
          lastUpdated: '2023-10-01T12:00:00Z',
        });
      }, 2000);
    });
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  public async getTaskSchema(taskRoute: string): Promise<TaskSchema> {
    // const task = this.apiRoutes.find((route) => route.run_task === taskRoute);
    // if (!task) {
    //   throw new Error('Task not found');
    // }
    // return fetch(task.task_schema)
    //   .then((res) => {
    //     if (res.status !== 200) {
    //       throw new Error('Failed to fetch task schema.');
    //     }
    //     return res.json();
    //   })
    //   .then((data: TaskSchema) => data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          inputs: [
            {
              key: 'input1',
              label: 'Input 1',
              subtitle: null,
              inputType: 'file',
            },
          ],
          parameters: [
            {
              key: 'param1',
              label: 'Parameter 1',
              subtitle: null,
              value: {
                parameterType: 'float',
                default: 1.0,
              },
            },
          ],
        });
      }, 2000);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public async runTask(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    taskRoute: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    requestBody: RequestBody,
  ): Promise<ResponseBody> {
    // this.abortController = new AbortController();
    // const { signal } = this.abortController;
    // const task = this.apiRoutes.find((route) => route.run_task === taskRoute);
    // if (!task) {
    //   throw new Error('Task not found');
    // }
    // return fetch(task.run_task, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(requestBody),
    //   signal,
    // })
    //   .then((res) => {
    //     if (res.status !== 200) {
    //       throw new Error('Failed to run task.');
    //     }
    //     return res.json();
    //   })
    //   .then((data: ResponseBody) => data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          output_type: 'file',
          file_type: 'img',
          path: '/path/to/output.jpg',
          title: 'Output Image',
          subtitle: 'Processed image',
        });
      }, 2000);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public async cancelTask(): Promise<void> {
    if (this.abortController) {
      this.abortController.abort();
    }
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
