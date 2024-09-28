import { Sequelize } from 'sequelize';
import { error, info } from 'electron-log';
import { initJob } from '../models/job';
import { initModelServer } from '../models/model-server';
import { initMLModel } from '../models/ml-model';

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

  async disconnect(): Promise<void> {
    info('Disconnecting from SQLite database');
    await this.connection.close();
    info('Disconnected from SQLite database');
  }
}

export default SQLiteDB;
