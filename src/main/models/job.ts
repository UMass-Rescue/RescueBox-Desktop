/* eslint-disable no-use-before-define */
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import MLModelDb from './ml-model';

export type Inputs = { path: string; path_type: string }[];
export type Outputs = { path: string; path_type: string }[];
export type Parameters = { [key: string]: any }[];

export enum JobStatus {
  Running = 'Running',
  Completed = 'Completed',
  Canceled = 'Canceled',
  Failed = 'Failed',
}

class JobDb extends Model<
  InferAttributes<JobDb>,
  InferCreationAttributes<JobDb>
> {
  declare uid: string;

  declare modelUid: string;

  declare startTime: Date;

  declare endTime: CreationOptional<Date>;

  declare status: JobStatus;

  declare statusText: CreationOptional<string>;

  declare inputs: Inputs; // JSON string

  declare outputs: Outputs; // JSON string

  declare parameters: Parameters; // JSON string

  declare response: CreationOptional<object>; // JSON string

  public static getAllJobs() {
    return JobDb.findAll();
  }

  public static getJobByStatus(status: JobStatus) {
    return JobDb.findAll({
      where: {
        status,
      },
    });
  }

  public static getJobByUid(uid: string) {
    return JobDb.findOne({
      where: {
        uid,
      },
    });
  }

  public static createJob(
    uid: string,
    modelUid: string,
    startTime: Date,
    inputs: Inputs,
    outputs: Outputs,
    parameters: Parameters,
  ) {
    return JobDb.create({
      uid,
      modelUid,
      startTime,
      inputs,
      outputs,
      parameters,
      status: JobStatus.Running,
      response: undefined,
    });
  }

  public static async updateJobStatus(uid: string, status: JobStatus) {
    const job = await JobDb.findByPk(uid);
    if (!job) {
      throw new Error(`Job with uid ${uid} not found`);
    }
    job.status = status;
    return job.save();
  }

  public static async updateJobStatusText(uid: string, statusText: string) {
    const job = await JobDb.findByPk(uid);
    if (!job) {
      throw new Error(`Job with uid ${uid} not found`);
    }
    job.statusText = statusText;
    return job.save();
  }

  public static async updateJobResponse(uid: string, response: object) {
    const job = await JobDb.findByPk(uid);
    if (!job) {
      throw new Error(`Job with uid ${uid} not found`);
    }
    job.response = response;
    return job.save();
  }

  public static async updateJobEndTime(uid: string, endTime: Date) {
    const job = await JobDb.findByPk(uid);
    if (!job) {
      throw new Error(`Job with uid ${uid} not found`);
    }
    job.endTime = endTime;
    return job.save();
  }

  public static deleteJob(uid: string) {
    return JobDb.destroy({
      where: {
        uid,
      },
    });
  }
}

export const initJob = async (connection: Sequelize) => {
  JobDb.init(
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
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(...Object.values(JobStatus)),
        allowNull: false,
      },
      statusText: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      inputs: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
          return JSON.parse(this.getDataValue('inputs') as unknown as string);
        },
        set(value) {
          this.setDataValue('inputs', JSON.stringify(value) as any);
        },
      },
      outputs: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
          return JSON.parse(this.getDataValue('outputs') as unknown as string);
        },
        set(value) {
          // @ts-ignore
          this.setDataValue('outputs', JSON.stringify(value));
        },
      },
      parameters: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
          return JSON.parse(
            this.getDataValue('parameters') as unknown as string,
          );
        },
        set(value) {
          // @ts-ignore
          this.setDataValue('parameters', JSON.stringify(value));
        },
      },
      response: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return JSON.parse(this.getDataValue('response') as unknown as string);
        },
        set(value) {
          // @ts-ignore
          this.setDataValue('response', JSON.stringify(value));
        },
      },
    },
    {
      sequelize: connection,
      tableName: 'jobs',
    },
  );
};

export default JobDb;
