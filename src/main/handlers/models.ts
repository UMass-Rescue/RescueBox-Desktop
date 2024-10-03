import { modelAppConfigs } from '../model-apps/config';
import MLModelDb from '../models/ml-model';

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
  return MLModelDb.findAll({ raw: true });
}

export async function getModelByUid(event: any, arg: GetModelByIdArgs) {
  const result = await MLModelDb.findOne({
    where: {
      uid: arg.modelUid,
    },
    raw: true,
  });
  if (result) result.lastUpdated = new Date(result.lastUpdated);
  return result;
}
