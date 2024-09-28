import { DataTypes, Model, Sequelize } from 'sequelize';

class MLModel extends Model {
  public id!: number;

  public uid!: string;

  public name!: string;

  public version!: string;

  public author!: string;

  public lastUpdated!: Date;

  public input!: string;

  public inputTypes!: string; // JSON string

  public outputTypes!: string; // JSON string

  public parameters!: string; // JSON string

  public constraints!: string; // JSON string
}

export const initMLModel = async (connection: Sequelize) => {
  MLModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      uid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
      inputTypes: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue('inputTypes');
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value: string[]) {
          this.setDataValue('inputTypes', JSON.stringify(value));
        },
      },
      outputTypes: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue('outputTypes');
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value: string[]) {
          this.setDataValue('outputTypes', JSON.stringify(value));
        },
      },
      parameters: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          const rawValue = this.getDataValue('parameters');
          return rawValue ? JSON.parse(rawValue) : {};
        },
        set(value: object) {
          this.setDataValue('parameters', JSON.stringify(value));
        },
      },
      constraints: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          const rawValue = this.getDataValue('constraints');
          return rawValue ? JSON.parse(rawValue) : {};
        },
        set(value: object) {
          this.setDataValue('constraints', JSON.stringify(value));
        },
      },
    },
    {
      sequelize: connection,
      modelName: 'mlmodels',
    },
  );
};

export default MLModel;
