/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  APIRoutes,
  ModelInfo,
  SchemaAPIRoute,
} from 'src/shared/generated_models';
import {
  isrModelRoutes,
  sbfModelInfo,
} from 'src/main/database/dummy_data/mlmodels';
import log from 'electron-log/main';
import isDummyMode from 'src/shared/dummy_data/set_dummy_mode';
import MLModelDb from '../models/ml-model';
import ModelServerDb from '../models/model-server';
import TaskDb from '../models/tasks';

const API_ROUTES_SLUG = '/api/routes';
const INFO_SLUG = '/info';

export default class RegisterModelService {
  static async registerModel(serverAddress: string, serverPort: number) {
    const modelInfo = await RegisterModelService.getInfo(
      serverAddress,
      serverPort,
    );
    const apiRoutes = await RegisterModelService.initializeAPIRoutes(
      serverAddress,
      serverPort,
    );
    const prevModel = await MLModelDb.getModelByModelInfoAndRoutes(
      modelInfo,
      apiRoutes,
    );
    if (prevModel) {
      log.info(`Old model found with uid ${prevModel.uid}`);
      log.info(
        `Updating registration info for ${prevModel.uid} at ${serverAddress}:${serverPort}`,
      );
      await ModelServerDb.updateServer(
        prevModel.uid,
        serverAddress,
        serverPort,
      );
      const server = await ModelServerDb.getServerByModelUid(prevModel.uid);
      if (!server) {
        throw new Error(`FATAL: Server not found for model ${prevModel.uid}`);
      }
      return server;
    }
    log.info(`Registering new model info at ${serverAddress}:${serverPort}`);
    const modelDb = await MLModelDb.createModel(modelInfo, apiRoutes);
    await RegisterModelService.createTasks(
      await RegisterModelService.getSchemaApiRoutes(apiRoutes),
      modelDb.uid,
    );
    return ModelServerDb.registerServer(modelDb.uid, serverAddress, serverPort);
  }

  private static async getSchemaApiRoutes(apiRoutes: APIRoutes) {
    return apiRoutes.filter((apiRoute) => 'order' in apiRoute);
  }

  private static async createTasks(
    apiRoutes: SchemaAPIRoute[],
    modelUid: string,
  ) {
    const taskParams = apiRoutes.map((route) => ({
      uid: String(route.order),
      modelUid,
      schemaApiRoute: route,
    }));
    return TaskDb.createTasks(taskParams);
  }

  private static async getInfo(
    serverAddress: string,
    serverPort: number,
  ): Promise<ModelInfo> {
    log.info(
      `Fetching info from http://${serverAddress}:${serverPort}${INFO_SLUG}`,
    );

    // return fetch(`http://${serverAddress}:${serverPort}${INFO_SLUG}`)
    //   .then(async (res) => {
    //     if (res.status !== 200) {
    //       throw new Error('Failed to fetch info.');
    //     }
    //     return res.json();
    //   })
    //   .then((data: ModelInfo) => data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(sbfModelInfo);
      }, 1000);
    });
  }

  private static async initializeAPIRoutes(
    serverAddress: string,
    serverPort: number,
  ): Promise<APIRoutes> {
    if (isDummyMode) {
      log.info(
        'Fetching api routes for isr model from dummy data. This will take some time.',
      );
      const apiRoutes = isrModelRoutes;
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(apiRoutes.filter((apiRoute) => 'order' in apiRoute));
        }, 1000);
      });
    }
    const url = `http://${serverAddress}:${serverPort}${API_ROUTES_SLUG}`;
    log.info(`Fetching api routes from ${url}`);
    const apiRoutes: APIRoutes = await fetch(url).then((res) => {
      if (res.status !== 200) {
        throw new Error(`Failed to fetch api routes. Status: ${res.status}`);
      }
      return res.json();
    });
    return apiRoutes;
  }
}
