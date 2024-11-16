/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MLModel, ModelServer } from 'src/shared/models';
import {
  AppMetadata,
  TaskSchema,
  RequestBody,
  ResponseBody,
  SchemaAPIRoute,
} from 'src/shared/generated_models';
import dummyApiRoutes from 'src/shared/dummy_data/api_routes';
import markdownResponseBody from 'src/shared/dummy_data/markdown_response';
import taskSchemas from 'src/shared/dummy_data/task_schemas';
import isDummyMode from 'src/shared/dummy_data/set_dummy_mode';
import camelcaseKeys from 'camelcase-keys';
import log from 'electron-log/main';
import ModelServerDb from '../models/model-server';
import MLModelDb from '../models/ml-model';

const API_ROUTES_SLUG = '/api/routes';

class ModelAppService {
  private modelDb: MLModel;

  private modelServer: ModelServer;

  private apiRoutes: SchemaAPIRoute[];

  private constructor(modelDb: MLModel, server: ModelServer) {
    this.modelDb = modelDb;
    this.modelServer = server;
    if (isDummyMode) {
      this.apiRoutes = dummyApiRoutes.filter((apiRoute) => 'order' in apiRoute);
    } else {
      this.apiRoutes = modelDb.routes.filter((apiRoute) => 'order' in apiRoute);
    }
  }

  static async init(modelUid: string): Promise<ModelAppService> {
    const modelServer = await ModelServerDb.getServerByModelUid(modelUid);
    if (!modelServer) {
      throw new Error(`Server not found for model ${modelUid}`);
    }
    const modelDb = await MLModelDb.getModelByUid(modelUid);
    if (!modelDb) {
      throw new Error(`Model not found for model ${modelUid}`);
    }
    return new ModelAppService(modelDb, modelServer);
  }

  public async getApiRoutes(): Promise<SchemaAPIRoute[]> {
    return this.apiRoutes;
  }

  public async getAppMetadata(): Promise<AppMetadata> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: this.modelDb.name,
          version: this.modelDb.version,
          author: this.modelDb.author,
          info: this.modelDb.info,
        } satisfies AppMetadata);
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
    if (isDummyMode) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(markdownResponseBody);
        }, 1000);
      });
    }
    const task = this.findRouteByTaskId(taskId);
    return fetch(
      `http://${this.modelServer.serverAddress}:${this.modelServer.serverPort}${task.run_task}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: AbortSignal.timeout(1_800_000),
      },
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Failed to run task.');
        }
        return res.json();
      })
      .then((data: ResponseBody) => data);
  }

  public async getTaskSchema(taskId: string): Promise<TaskSchema> {
    if (isDummyMode) {
      log.info(`Fetching task schema for task ${taskId}`);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(taskSchemas[Number(taskId)]);
        }, 1000);
      });
    }
    const task = this.findRouteByTaskId(taskId);
    const url = `http://${this.modelServer.serverAddress}:${this.modelServer.serverPort}${task.task_schema}`;
    return fetch(url)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch task schema.');
        }
        return res.json();
      })
      .then(
        (data: Record<string, unknown>) =>
          camelcaseKeys(data, { deep: true }) as unknown as TaskSchema,
      )
      .catch((error) => {
        log.error('Failed to fetch task schema', error);
        throw new Error('Failed to fetch task schema. Server may be offline.');
      });
  }

  public async pingHealth(): Promise<boolean> {
    if (isDummyMode) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });
    }
    return fetch(
      `http://${this.modelServer.serverAddress}:${this.modelServer.serverPort}${API_ROUTES_SLUG}`,
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch app metadata.');
        }
        return res.json();
      })
      .then(() => true)
      .catch(() => false);
  }
}

export default ModelAppService;
