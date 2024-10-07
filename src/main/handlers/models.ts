import { ModelAppConfig } from 'src/shared/models';
import { warn } from 'electron-log/main';
import { modelAppConfigs } from '../model-apps/config';
import MLModelDb from '../models/ml-model';
import { getRaw } from '../util';

export type GetModelByIdArgs = {
  modelUid: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getModels(_event: any, _arg: any) {
  const models = modelAppConfigs;
  // create or update
  await Promise.all(
    models.map(async (model) => {
      await MLModelDb.findOne({
        where: {
          uid: model.uid,
        },
      }).then((prevModel) => {
        if (prevModel) {
          return prevModel.update({ ...model });
        }
        return MLModelDb.createModel(
          model.uid,
          model.name,
          model.version,
          model.author,
          new Date(model.lastUpdated),
        );
      });
    }),
  );
  return MLModelDb.findAll().then((modelsDb) => modelsDb.map(getRaw));
}

export async function getModelByUid(event: any, arg: GetModelByIdArgs) {
  return MLModelDb.getModelByUid(arg.modelUid).then(getRaw);
}

export function getModelAppConfigByUid(
  event: any,
  arg: GetModelByIdArgs,
): ModelAppConfig {
  const modelAppConfig = modelAppConfigs.find(
    (config) => config.uid === arg.modelUid,
  );
  if (!modelAppConfig) {
    warn(`Model with uid ${arg.modelUid} not found in config.ts`);
    warn(
      `Returning a dummy config for model with uid ${arg.modelUid}. This is not recommended.`,
    );
    return modelAppConfigs.find((config) => config.uid === 'ten-second-model')!;
  }
  return modelAppConfig;
}
