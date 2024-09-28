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
    uid: string,
    modelUid: string,
    serverAddress: string,
    serverPort: number,
  ) {
    return ModelServer.create({
      uid,
      modelUid,
      serverAddress,
      serverPort,
    });
  }

  public static updateServer(
    uid: string,
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
          uid,
          modelUid,
        },
      },
    );
  }

  public static deleteServer(uid: string, modelUid: string) {
    return ModelServer.destroy({
      where: {
        uid,
        modelUid,
      },
    });
  }

  public static deleteServerByUid(uid: string) {
    return ModelServer.destroy({
      where: {
        uid,
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
