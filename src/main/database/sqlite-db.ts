import { Sequelize, QueryInterface } from 'sequelize';
import { error, info } from 'electron-log/main';
import { Umzug } from 'umzug';
import JobDb, { initJob } from '../models/job';
import ModelServerDb, { initModelServer } from '../models/model-server';
import MLModelDb, { initMLModel } from '../models/ml-model';
import jobData from './dummy_data/jobs';
import mlmodelData from './dummy_data/mlmodels';
import serverData from './dummy_data/servers';

class SQLiteDB {
  private connection: Sequelize;

  private umzug: Umzug<QueryInterface>;

  constructor(conn: Sequelize, umzug: Umzug<QueryInterface>) {
    this.connection = conn;
    this.umzug = umzug;
  }

  async connect(): Promise<void> {
    try {
      info('Connecting to SQLite database');
      await this.connection.authenticate();
      info('Connected to SQLite database');
    } catch (err: any) {
      error('Failed to connect to SQLite database', err);
    }
    try {
      info('Running migrations');
      const migrations = await this.umzug.up();
      info('Migrations ran successfully', migrations);
    } catch (err: any) {
      error('Failed to run migrations', err);
    }
    try {
      info('Initializing models');
      await this.initModels();
      info('Models initialized');
    } catch (err) {
      error('Failed to initialize models', err);
    }
  }

  async initModels(): Promise<void> {
    info('Initializing tables in SQLite database');
    await initMLModel(this.connection);
    await initJob(this.connection);
    await initModelServer(this.connection);
    info('Initialized tables in SQLite database');
  }

  // eslint-disable-next-line class-methods-use-this
  async initDummyData(): Promise<void> {
    await MLModelDb.bulkCreate(mlmodelData);
    await ModelServerDb.bulkCreate(serverData);
    // @ts-ignore
    await JobDb.bulkCreate(jobData);

    info('Initialized dummy data in SQLite database');
  }

  // eslint-disable-next-line class-methods-use-this
  async clearDummyData(): Promise<void> {
    await ModelServerDb.destroy({ where: {} });
    await JobDb.destroy({ where: {} });
    await MLModelDb.destroy({ where: {} });

    info('Cleared dummy data in SQLite database');
  }

  async resetDummyData(): Promise<void> {
    await this.clearDummyData();
    await this.initDummyData();
  }

  async resetTables(): Promise<void> {
    await ModelServerDb.destroy({ where: {} });
    await JobDb.destroy({ where: {} });
    await this.initModels();
  }

  async disconnect(): Promise<void> {
    info('Disconnecting from SQLite database');
    await this.connection.close();
    info('Disconnected from SQLite database');
  }
}

export default SQLiteDB;
