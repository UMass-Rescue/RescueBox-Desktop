import { Sequelize } from 'sequelize';
import { error, info } from 'electron-log/main';
import JobDb, { initJob } from '../models/job';
import ModelServerDb, { initModelServer } from '../models/model-server';
import MLModelDb, { initMLModel } from '../models/ml-model';
import jobData from './dummy_data/jobs';
import mlmodelData from './dummy_data/mlmodels';
import serverData from './dummy_data/servers';

class SQLiteDB {
  private connection: Sequelize;

  constructor(conn: Sequelize) {
    this.connection = conn;
  }

  async connect(): Promise<void> {
    try {
      info('Connecting to SQLite database');
      await this.connection.authenticate();
      await this.initTables();
      await this.connection.sync();
      info('Connected to SQLite database');
    } catch (err) {
      error('Unable to connect to SQLite database', err);
    }
  }

  async initTables(): Promise<void> {
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
    await this.initTables();
  }

  async disconnect(): Promise<void> {
    info('Disconnecting from SQLite database');
    await this.connection.close();
    info('Disconnected from SQLite database');
  }
}

export default SQLiteDB;
