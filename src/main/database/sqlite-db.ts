import { error, info } from 'electron-log';
import { Sequelize } from '@sequelize/core';
import MLModel, { initMLModel } from '../models/ml-model';
import ModelServer, { initModelServer } from '../models/model-server';
import Job, { initJob } from '../models/job';

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
    try {
      info('Initializing tables');
      await initMLModel(this.connection);
      await initModelServer(this.connection);
      MLModel.hasOne(ModelServer, { as: 'server', foreignKey: 'modelUid' });
      await initJob(this.connection);
      MLModel.hasMany(Job, { as: 'jobs', foreignKey: 'modelUid' });
      info('Initialized tables');
    } catch (err) {
      error('Unable to initialize tables', err);
    }
  }

  async disconnect(): Promise<void> {
    info('Disconnecting from SQLite database');
    await this.connection.close();
    info('Disconnected from SQLite database');
  }
}

export default SQLiteDB;
