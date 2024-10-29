/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ModelServer } from 'src/shared/models';
import {
  ModelInfo,
  TaskSchema,
  RequestBody,
  ResponseBody,
  SchemaAPIRoute,
  APIRoutes,
} from 'src/shared/generated_models';
import dummyApiRoutes from 'src/shared/dummy_data/api_routes';
import markdownResponseBody from 'src/shared/dummy_data/markdown_response';
import isrModelInfo from 'src/shared/dummy_data/info_page';
import taskSchemas from 'src/shared/dummy_data/task_schemas';
import ModelServerDb from '../models/model-server';

const INFO_SLUG = '/info';
const API_ROUTES_SLUG = '/api/routes';

class ModelAppService {
  private modelUid: string;

  private modelServer: ModelServer;

  private apiRoutes: SchemaAPIRoute[];

  private constructor(
    modelUid: string,
    server: ModelServer,
    schemaRoutes: SchemaAPIRoute[],
  ) {
    this.modelUid = modelUid;
    this.modelServer = server;
    this.apiRoutes = schemaRoutes;
  }

  static async init(modelUid: string): Promise<ModelAppService> {
    const modelServer = await ModelServerDb.getServerByModelUid(modelUid);
    if (!modelServer) {
      throw new Error(`Server not found for model ${modelUid}`);
    }
    const apiRoutess = await ModelAppService.initializeAPIRoutes(
      modelServer.serverAddress,
      modelServer.serverPort,
    );
    return new ModelAppService(modelUid, modelServer, apiRoutess);
  }

  private static async initializeAPIRoutes(
    serverAddress: string,
    serverPort: number,
  ): Promise<SchemaAPIRoute[]> {
    // const apiRoutes: APIRoutes = await fetch(
    //   `http://${serverAddress}:${serverPort}${API_ROUTES_SLUG}`,
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
    const apiRoutes = dummyApiRoutes;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(apiRoutes.filter((apiRoute) => 'order' in apiRoute));
      }, 1000);
    });
  }

  public async getApiRoutes(): Promise<SchemaAPIRoute[]> {
    return this.apiRoutes;
  }

  public async getInfo(): Promise<ModelInfo> {
    // return fetch(
    //   `http://${this.modelServer.serverAddress}:${this.modelServer.serverPort}${INFO_SLUG}`,
    // )
    //   .then((res) => {
    //     if (res.status !== 200) {
    //       throw new Error('Failed to fetch info.');
    //     }
    //     return res.json();
    //   })
    //   .then((data: ModelInfo) => data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(isrModelInfo);
      }, 1000);
    });
  }

  public checkValidTaskId(taskId: string): boolean {
    const task = this.apiRoutes.find((route) => String(route.order) === taskId);
    return !!task;
  }

  public findRouteByTaskId(taskId: string): SchemaAPIRoute {
    const task = this.apiRoutes.find((route) => String(route.order) === taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  public async runTask(
    taskId: string,
    requestBody: RequestBody,
  ): Promise<ResponseBody> {
    // const task = this.findRouteByTaskId(taskId);
    // return fetch(
    //   `http://${this.modelServer.serverAddress}:${this.modelServer.serverPort}${task.run_task}`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(requestBody),
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

  public async getTaskSchema(taskId: string): Promise<TaskSchema> {
    // const task = this.findRouteByTaskId(taskId);
    // return fetch(
    //   `http://${this.modelServer.serverAddress}:${this.modelServer.serverPort}${task.task_schema}`,
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
        resolve(taskSchemas[Number(taskId)]);
      }, 1000);
    });
  }
}

export default ModelAppService;
