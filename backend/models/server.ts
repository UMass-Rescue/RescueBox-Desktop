import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Server extends Model {
  public uid!: string;

  public modelUid!: string;

  public serverAddress?: string;
}

Server.init(
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
  },
  {
    sequelize,
    tableName: 'servers',
  },
);

export default Server;
