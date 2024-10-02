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

export type Inputs = { path: string; [key: string]: string }[];
export type Outputs = { path: string; [key: string]: string }[];
export type Parameters = { [key: string]: any }[];

export enum JobStatus {
  Running = 'Running',
  Completed = 'Completed',
  Canceled = 'Canceled',
  Failed = 'Failed',
}

class Job extends Model<InferAttributes<Job>, InferCreationAttributes<Job>> {
  declare uid: string;

  declare modelUid: ForeignKey<string>;

  declare startTime: Date;

  declare endTime: CreationOptional<Date>;

  declare status: JobStatus;

  get inputs(): Inputs {
    console.log('using the getter', this.getDataValue('inputs'));
    return JSON.parse(this.getDataValue('inputs') as unknown as string);
  }

  set inputs(value: Inputs) {
    console.log('using the setter', value);
    this.setDataValue('inputs', JSON.stringify(value) as any);
  }

  declare outputs: Outputs; // JSON string

  declare parameters: Parameters; // JSON string

  declare logOutput: string;

  declare response: CreationOptional<object>; // JSON string

  public static getAllJobs() {
    return Job.findAll({ raw: true });
  }

  public static getJobByStatus(status: JobStatus) {
    return Job.findAll({
      where: {
        status,
      },
      raw: true,
    });
  }

  public static getJobByUid(uid: string) {
    return Job.findOne({
      where: {
        uid,
      },
      raw: true,
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
    return Job.create(
      {
        uid,
        modelUid,
        startTime,
        inputs,
        outputs,
        parameters,
        logOutput: '',
        status: JobStatus.Running,
        response: undefined,
      },
      { raw: true },
    );
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

  public static updateJobResponse(uid: string, response: object) {
    return Job.update(
      {
        response,
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
      inputs: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
          console.log('using the getter', this.getDataValue('inputs'));
          return JSON.parse(this.getDataValue('inputs') as unknown as string);
        },
        set(value) {
          // @ts-ignore
          this.setDataValue('inputs', JSON.stringify(value));
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
      logOutput: {
        type: DataTypes.TEXT,
        allowNull: false,
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

export default Job;
