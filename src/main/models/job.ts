import { DataTypes, Model, Sequelize } from 'sequelize';
import MLModel from './ml-model';

enum JobStatus {
  Running = 'Running',
  Completed = 'Completed',
  Canceled = 'Canceled',
  Failed = 'Failed',
}

class Job extends Model {
  public uid!: string;

  public modelUid!: string;

  public startTime!: Date;

  public endTime!: Date;

  public status!: JobStatus;

  public inputDir!: string;

  public outputDir!: string;

  public parameters!: string; // JSON string

  public logOutput!: string; // JSON string

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
    logOutput: string,
  ) {
    return Job.create({
      uid,
      modelUid,
      startTime,
      inputDir,
      outputDir,
      parameters,
      logOutput,
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
