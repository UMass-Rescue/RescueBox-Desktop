/* eslint-disable no-use-before-define */
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
  Model,
} from 'sequelize';

class MLModelDb extends Model<
  InferAttributes<MLModelDb>,
  InferCreationAttributes<MLModelDb>
> {
  declare uid: string;

  declare name: string;

  declare version: string;

  declare author: CreationOptional<string>;

  declare lastUpdated: Date;

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

  public static createModel(
    uid: string,
    name: string,
    version: string,
    author: string,
    lastUpdated: Date,
  ) {
    return MLModelDb.create({
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
    return MLModelDb.update(
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
    return MLModelDb.destroy({
      where: {
        uid,
      },
    });
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

export default MLModelDb;
