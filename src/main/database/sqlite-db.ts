import { Sequelize } from 'sequelize';
import { error, info } from 'electron-log';
import { initJob } from '../models/job';
import { initModelServer } from '../models/model-server';
import { initMLModel } from '../models/ml-model';
import jobData from './dummy_data/jobs.json';
import mlmodelData from './dummy_data/mlmodels.json';
import serverData from './dummy_data/servers.json';

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
      await this.connection.sync({ alter: true });
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

  async initDummyData(): Promise<void> {
    await this.connection.models.mlmodels.bulkCreate(mlmodelData);
    await this.connection.models.ModelServerDb.bulkCreate(serverData);
    await this.connection.models.JobDb.bulkCreate(jobData);

    info('Initialized dummy data in SQLite database');
  }

  async clearDummyData(): Promise<void> {
    await this.connection.models.ModelServerDb.destroy({ where: {} });
    await this.connection.models.JobDb.destroy({ where: {} });
    await this.connection.models.mlmodels.destroy({ where: {} });

    info('Cleared dummy data in SQLite database');
  }

  async disconnect(): Promise<void> {
    info('Disconnecting from SQLite database');
    await this.connection.close();
    info('Disconnected from SQLite database');
  }
}

export default SQLiteDB;
