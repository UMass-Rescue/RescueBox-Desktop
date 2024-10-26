/* eslint-disable no-use-before-define */
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { RequestBody, ResponseBody } from 'src/shared/generated_models';
import MLModelDb from './ml-model';

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

  declare request: RequestBody; // JSON string

  declare response: CreationOptional<ResponseBody>; // JSON string

  declare taskRoute: string;

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

  public static async getJobByUid(uid: string) {
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
    request: RequestBody,
    taskRoute: string,
  ) {
    return JobDb.create({
      uid,
      modelUid,
      startTime,
      request,
      status: JobStatus.Running,
      taskRoute,
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

  public static async updateJobResponse(uid: string, response: ResponseBody) {
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
      request: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
          return JSON.parse(this.getDataValue('request') as unknown as string);
        },
        set(value) {
          this.setDataValue('request', JSON.stringify(value) as any);
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
      taskRoute: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: connection,
      tableName: 'jobs',
    },
  );
};

export default JobDb;
