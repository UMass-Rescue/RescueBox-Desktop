import { DataTypes, Model, Sequelize } from 'sequelize';

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
