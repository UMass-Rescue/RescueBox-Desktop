/* eslint-disable no-use-before-define */
import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from '@sequelize/core';
import MLModel from './ml-model';

export enum JobStatus {
  Running = 'Running',
  Completed = 'Completed',
  Canceled = 'Canceled',
  Failed = 'Failed',
}

export class Job extends Model<
  InferAttributes<Job>,
  InferCreationAttributes<Job>
> {
  declare uid: string;

  declare modelUid: ForeignKey<string>;

  declare startTime: Date;

  declare endTime: CreationOptional<Date>;

  declare status: JobStatus;

  declare inputDir: string;

  declare outputDir: string;

  declare parameters: string;

  declare logOutput: string;

  public static getAllJobs() {
    return Job.findAll();
  }

  public static getJobByStatus(status: JobStatus) {
    return Job.findAll({
      where: {
        status,
      },
    });
  }

  public static getJobByUid(uid: string) {
    return Job.findOne({
      where: {
        uid,
      },
    });
  }

  public static createJob(
    uid: string,
    modelUid: string,
    startTime: Date,
    inputDir: string,
    outputDir: string,
    parameters: string,
  ) {
    return Job.create({
      uid,
      modelUid,
      startTime,
      inputDir,
      outputDir,
      parameters,
      logOutput: '',
      status: JobStatus.Running,
    });
  }

  public static updateJobStatus(uid: string, status: JobStatus) {
    return Job.update(
      {
        status,
      },
      {
        where: {
          uid,
        },
      },
    );
  }

  public static updateJobEndTime(uid: string, endTime: Date) {
    return Job.update(
      {
        endTime,
      },
      {
        where: {
          uid,
        },
      },
    );
  }

  public static updateJobLogOutput(uid: string, logOutput: string) {
    return Job.update(
      {
        logOutput,
      },
      {
        where: {
          uid,
        },
      },
    );
  }

  public static deleteJob(uid: string) {
    return Job.destroy({
      where: {
        uid,
      },
    });
  }
}

export const initJob = async (connection: Sequelize) => {
  Job.init(
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
          model: MLModel,
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
      inputDir: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      outputDir: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parameters: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      logOutput: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize: connection,
      tableName: 'jobs',
    },
  );
};

export default Job;
