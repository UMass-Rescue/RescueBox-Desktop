/* eslint-disable no-use-before-define */
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { SchemaAPIRoute, TaskSchema } from 'src/shared/generated_models';
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

  declare taskSchema: TaskSchema; // JSON String

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
    modelUid: string,
    schemaApiRoute: SchemaAPIRoute,
    taskSchema: TaskSchema,
  ) {
    const {
      short_title: shortTitle,
      run_task: taskRoute,
      order: taskOrder,
    } = schemaApiRoute;

    const uid = String(taskOrder);

    return TaskDb.create({
      uid,
      modelUid,
      shortTitle,
      taskRoute,
      taskOrder,
      taskSchema,
    });
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
      taskSchema: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
          // @ts-ignore
          return JSON.parse(this.getDataValue('taskSchema') as TaskSchema);
        },
        set(value) {
          this.setDataValue('taskSchema', JSON.stringify(value) as any);
        },
      },
    },
    {
      sequelize: connection,
      tableName: 'tasks',
    },
  );
};

export default TaskDb;
