import MLModel from '../models/ml-model';

export type GetModelByIdArgs = {
  modelUid: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getModels(_event: any, _arg: any) {
  const models = [
    {
      uid: 'model-a1b2c3d4',
      name: 'Image Classification Model',
      version: '1.0.0',
      author: 'John Doe',
      lastUpdated: new Date('2023-10-26T10:00:00Z'),
    },
    {
      uid: 'model-e5f6g7h8',
      name: 'Sentiment Analysis Model',
      version: '2.1.0',
      author: 'Jane Smith',
      lastUpdated: new Date('2023-10-25T15:30:00Z'),
    },
    {
      uid: 'model-i9j0k1l2',
      name: 'Fraud Detection Model',
      version: '0.5.0',
      author: 'David Lee',
      lastUpdated: new Date('2023-10-24T08:00:00Z'),
    },
    {
      uid: 'model-m3n4o5p6',
      name: 'Object Detection Model',
      version: '1.2.3',
      author: 'Sarah Jones',
      lastUpdated: new Date('2023-10-23T12:00:00Z'),
    },
    {
      uid: 'model-q7r8s9t0',
      name: 'Recommendation Model',
      version: '3.0.0',
      author: 'Michael Brown',
      lastUpdated: new Date('2023-10-22T18:00:00Z'),
    },
  ];
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
