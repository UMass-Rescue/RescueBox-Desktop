import { DataTypes, Model, Sequelize } from 'sequelize';

class MLModel extends Model {
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
    inputTypes: object,
    outputTypes: object,
    parameters: object,
    constraints: object,
  ) {
    return MLModel.create({
      uid,
      name,
      version,
      author,
      lastUpdated,
      inputTypes,
      outputTypes,
      parameters,
      constraints,
    });
  }

  public static updateModel(
    uid: string,
    name: string,
    version: string,
    author: string,
    lastUpdated: Date,
    inputTypes: object,
    outputTypes: object,
    parameters: object,
    constraints: object,
  ) {
    return MLModel.update(
      {
        name,
        version,
        author,
        lastUpdated,
        inputTypes,
        outputTypes,
        parameters,
        constraints,
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
