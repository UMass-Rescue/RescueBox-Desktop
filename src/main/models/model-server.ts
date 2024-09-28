import { DataTypes, Model, Sequelize } from 'sequelize';

class ModelServer extends Model {
  public modelUid!: string;

  public serverAddress?: string;

  public serverPort?: number;

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

  public static registerServer(
    modelUid: string,
    serverAddress: string,
    serverPort: number,
  ) {
    return ModelServer.findOrCreate({
      where: {
        modelUid,
      },
      defaults: {
        serverAddress,
        serverPort,
      },
    });
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
