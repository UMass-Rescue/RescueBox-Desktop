/* eslint-disable no-use-before-define */
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import MLModel from './ml-model';

class ModelServer extends Model<
  InferAttributes<ModelServer>,
  InferCreationAttributes<ModelServer>
> {
  declare serverAddress: string;

  declare serverPort: number;

  declare modelUid: string;

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
        type: DataTypes.NUMBER,
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
