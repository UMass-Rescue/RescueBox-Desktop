/* eslint-disable @typescript-eslint/no-unused-vars */
import { APIRoutes, ModelInfo } from 'src/shared/generated_models';
import isrModelInfo from 'src/shared/dummy_data/info_page';
import {
  isrModelRoutes,
  sbfModelInfo,
} from 'src/main/database/dummy_data/mlmodels';
import log from 'electron-log/main';
import isDummyMode from 'src/shared/dummy_data/set_dummy_mode';
import MLModelDb from '../models/ml-model';
import ModelServerDb from '../models/model-server';

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
    return ModelServerDb.registerServer(modelDb.uid, serverAddress, serverPort);
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
    log.info(
      `Fetching api routes from http://${serverAddress}:${serverPort}${INFO_SLUG}`,
    );
    if (isDummyMode) {
      const apiRoutes = isrModelRoutes;
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(apiRoutes.filter((apiRoute) => 'order' in apiRoute));
        }, 1000);
      });
    }
    const apiRoutes: APIRoutes = await fetch(
      `http://${serverAddress}:${serverPort}${API_ROUTES_SLUG}`,
    ).then((res) => {
      if (res.status !== 200) {
        throw new Error(`Failed to fetch api routes. Status: ${res.status}`);
      }
      return res.json();
    });
    return apiRoutes;
  }
}
