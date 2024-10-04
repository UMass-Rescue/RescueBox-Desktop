/* eslint-disable no-use-before-define */
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import MLModelDb from './ml-model';

class ModelServerDb extends Model<
  InferAttributes<ModelServerDb>,
  InferCreationAttributes<ModelServerDb>
> {
  declare serverAddress: string;

  declare serverPort: number;

  declare modelUid: string;

  public static async getAllServers() {
    return ModelServerDb.findAll();
  }

  public static getServerByModelUid(modelUid: string) {
    return ModelServerDb.findOne({
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
    const [model, _wasCreated] = await ModelServerDb.findOrCreate({
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
    return ModelServerDb.update(
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
    return ModelServerDb.destroy({
      where: {
        modelUid,
      },
    });
  }

  public static deleteServerByModelUid(modelUid: string) {
    return ModelServerDb.destroy({
      where: {
        modelUid,
      },
    });
  }
}

export const initModelServer = async (connection: Sequelize) => {
  ModelServerDb.init(
    {
      modelUid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: MLModelDb,
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

export default ModelServerDb;
