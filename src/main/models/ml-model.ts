/* eslint-disable no-use-before-define */
import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from '@sequelize/core';
import { Job } from './job';
import ModelServer from './model-server';

class MLModel extends Model<
  InferAttributes<MLModel>,
  InferCreationAttributes<MLModel>
> {
  declare uid: string;

  declare name: string;

  declare version: string;

  declare author: CreationOptional<string>;

  declare lastUpdated: Date;

  declare server: NonAttribute<ModelServer | null>;

  declare jobs: NonAttribute<Job[]>;

  public static getAllModels() {
    return MLModel.findAll();
  }

  public static getModelByUid(uid: string) {
    return MLModel.findOne({
      where: {
        uid,
      },
    });
  }

  public static createModel(
    uid: string,
    name: string,
    version: string,
    author: string,
    lastUpdated: Date,
  ) {
    return MLModel.create({
      uid,
      name,
      version,
      author,
      lastUpdated,
    });
  }

  public static updateModel(
    uid: string,
    name: string,
    version: string,
    author: string,
    lastUpdated: Date,
  ) {
    return MLModel.update(
      {
        name,
        version,
        author,
        lastUpdated,
      },
      {
        where: {
          uid,
        },
      },
    );
  }

  public static deleteModel(uid: string) {
    return MLModel.destroy({
      where: {
        uid,
      },
    });
  }

  public static deleteAllModels() {
    return MLModel.destroy({
      where: {},
    });
  }
}

export const initMLModel = async (connection: Sequelize) => {
  MLModel.hasOne(ModelServer, { as: 'server', foreignKey: 'modelUid' });
  MLModel.hasMany(Job, { as: 'jobs', foreignKey: 'modelUid' });
  MLModel.init(
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
        allowNull: true,
      },
      lastUpdated: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize: connection,
      modelName: 'mlmodels',
    },
  );
};

export default MLModel;
