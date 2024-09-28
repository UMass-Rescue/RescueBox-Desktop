import { DataTypes, Model, Sequelize } from 'sequelize';

class ModelServer extends Model {
  public uid!: string;

  public modelUid!: string;

  public serverAddress?: string;

  public serverPort?: number;
}

export const initModelServer = async (connection: Sequelize) => {
  ModelServer.init(
    {
      uid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      modelUid: {
        type: DataTypes.STRING,
        allowNull: false,
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
