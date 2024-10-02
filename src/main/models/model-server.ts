/* eslint-disable no-use-before-define */
import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from '@sequelize/core';
import MLModel from './ml-model';

class ModelServer extends Model<
  InferAttributes<ModelServer>,
  InferCreationAttributes<ModelServer>
> {
  declare modelUid: string;

  declare serverAddress: CreationOptional<string>;

  declare serverPort: CreationOptional<number>;

  public static getAllServers() {
    return ModelServer.findAll();
  }

  public static getServerByModelUid(modelUid: string) {
    return ModelServer.findOne({
      where: {
        modelUid,
      },
    });
  }

  public static async registerServer(
    modelUid: string,
    serverAddress: string,
    serverPort: number,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [model, _wasCreated] = await ModelServer.findOrCreate({
      where: {
        modelUid,
      },
      defaults: {
        modelUid,
        serverAddress,
        serverPort,
      },
    });
    return model;
  }

  public static updateServer(
    modelUid: string,
    serverAddress: string,
    serverPort: number,
  ) {
    return ModelServer.update(
      {
        serverAddress,
        serverPort,
      },
      {
        where: {
          modelUid,
        },
      },
    );
  }

  public static deleteServer(modelUid: string) {
    return ModelServer.destroy({
      where: {
        modelUid,
      },
    });
  }

  public static deleteServerByModelUid(modelUid: string) {
    return ModelServer.destroy({
      where: {
        modelUid,
      },
    });
  }
}

export const initModelServer = async (connection: Sequelize) => {
  ModelServer.belongsTo(MLModel, { as: 'model', foreignKey: 'modelUid' });
  ModelServer.init(
    {
      modelUid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: MLModel,
          key: 'uid',
        },
      },
      serverAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      serverPort: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize: connection,
      tableName: 'servers',
    },
  );
};

export default ModelServer;
