/* eslint-disable no-use-before-define */
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

class MLModel extends Model<
  InferAttributes<MLModel>,
  InferCreationAttributes<MLModel>
> {
  declare uid: string;

  declare name: string;

  declare version: string;

  declare author: CreationOptional<string>;

  declare lastUpdated: Date;

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
