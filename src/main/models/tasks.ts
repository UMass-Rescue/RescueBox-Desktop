/* eslint-disable no-use-before-define */
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { SchemaAPIRoute } from 'src/shared/generated_models';
import MLModelDb from './ml-model';

/*
(taskUid,modelUid) - primary key
shortTitle
taskRoute
taskOrder
taskSchema
*/

class TaskDb extends Model<
  InferAttributes<TaskDb>,
  InferCreationAttributes<TaskDb>
> {
  declare uid: string;

  declare modelUid: string;

  declare shortTitle: string;

  declare taskRoute: string;

  declare taskOrder: number;

  public static getAllTasks() {
    return TaskDb.findAll();
  }

  public static async getTaskByUid(uid: string) {
    return TaskDb.findOne({
      where: {
        uid,
      },
    });
  }

  public static getTaskByModelUid(modelUid: string) {
    return TaskDb.findAll({
      where: {
        modelUid,
      },
    });
  }

  public static createTask(
    uid: string,
    modelUid: string,
    schemaApiRoute: SchemaAPIRoute,
  ) {
    const {
      short_title: shortTitle,
      run_task: taskRoute,
      order: taskOrder,
    } = schemaApiRoute;

    return TaskDb.create({
      uid,
      modelUid,
      shortTitle,
      taskRoute,
      taskOrder,
    });
  }

  public static createTasks(
    taskParams: {
      uid: string;
      modelUid: string;
      schemaApiRoute: SchemaAPIRoute;
    }[],
  ) {
    return Promise.all(
      taskParams.map((tP) =>
        TaskDb.createTask(tP.uid, tP.modelUid, tP.schemaApiRoute),
      ),
    );
  }

  public static deleteTask(uid: string) {
    return TaskDb.destroy({
      where: {
        uid,
      },
    });
  }
}

export const initTask = async (connection: Sequelize) => {
  TaskDb.init(
    {
      uid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      modelUid: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: MLModelDb,
          key: 'uid',
        },
        primaryKey: true,
      },
      shortTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      taskOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      taskRoute: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: connection,
      tableName: 'tasks',
    },
  );
};

export default TaskDb;
