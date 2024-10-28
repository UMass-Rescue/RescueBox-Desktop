/* eslint-disable no-use-before-define */
import md5 from 'md5';
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
  Model,
  CreationOptional,
} from 'sequelize';
import { APIRoutes, ModelInfo } from 'src/shared/generated_models';

function createModelId(modelInfo: ModelInfo, routes: APIRoutes): string {
  const routesString = JSON.stringify(routes) + JSON.stringify(modelInfo);
  return md5(routesString);
}

class MLModelDb extends Model<
  InferAttributes<MLModelDb>,
  InferCreationAttributes<MLModelDb>
> {
  declare uid: string;

  declare name: string;

  declare version: string;

  declare author: string;

  declare info: string;

  declare routes: APIRoutes;

  declare updatedAt: CreationOptional<Date>;

  public static getAllModels() {
    return MLModelDb.findAll();
  }

  public static getModelByUid(uid: string) {
    return MLModelDb.findOne({
      where: {
        uid,
      },
    });
  }

  public static createModel(modelInfo: ModelInfo, routes: APIRoutes) {
    const uid = createModelId(modelInfo, routes);
    const { name, version, author } = modelInfo;
    return MLModelDb.create({
      uid,
      name,
      version,
      author,
      info: modelInfo.info,
      routes,
    });
  }

  public static createModels(
    modelData: { info: ModelInfo; routes: APIRoutes }[],
  ) {
    return Promise.all(
      modelData.map((m) => MLModelDb.createModel(m.info, m.routes)),
    );
  }

  public static deleteAllModels() {
    return MLModelDb.destroy({
      where: {},
    });
  }
}

export const initMLModel = async (connection: Sequelize) => {
  MLModelDb.init(
    {
      uid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      version: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      info: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      routes: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return JSON.parse(
            // @ts-ignore
            this.getDataValue('routes') as unknown as APIRoutes,
          );
        },
        set(value) {
          // @ts-ignore
          this.setDataValue('routes', JSON.stringify(value));
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize: connection,
      modelName: 'mlmodels',
    },
  );
};

export default MLModelDb;
