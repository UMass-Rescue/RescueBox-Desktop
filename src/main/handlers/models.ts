import { modelAppConfigs } from '../model-apps/config';
import MLModel from '../models/ml-model';

export type GetModelByIdArgs = {
  modelUid: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getModels(_event: any, _arg: any) {
  const models = modelAppConfigs;
  // create or update
  await Promise.all(
    models.map(async (model) => {
      await MLModel.findOne({
        where: {
          uid: model.uid,
        },
      }).then((prevModel) => {
        if (prevModel) {
          return prevModel.update({ ...model });
        }
        return MLModel.createModel(
          model.uid,
          model.name,
          model.version,
          model.author,
          new Date(model.lastUpdated),
        );
      });
    }),
  );
  return MLModel.findAll({ raw: true });
}

export async function getModelByUid(event: any, arg: GetModelByIdArgs) {
  return MLModel.findOne({
    where: {
      uid: arg.modelUid,
    },
    raw: true,
  });
}
