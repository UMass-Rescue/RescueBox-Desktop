import { Sequelize } from 'sequelize';
import { info } from 'console';
import BaseDB from './base';
import sqlite3Connection from './constants';
import { initJob } from '../models/job';
import { initModelServer } from '../models/model-server';
import { initMLModel } from '../models/ml-model';

class SQLiteDB implements BaseDB {
  private connection: Sequelize;

  constructor() {
    this.connection = sqlite3Connection;
  }

  async connect(): Promise<void> {
    try {
      info('Connecting to SQLite database');
      await this.connection.authenticate();
      await this.connection.sync({ alter: true });
      info('Connected to SQLite database');
      await this.initTables();
    } catch (error) {
      info('Unable to connect to SQLite database');
    }
  }

  async initTables(): Promise<void> {
    info('Initializing tables in SQLite database');
    await initJob(this.connection);
    await initModelServer(this.connection);
    await initMLModel(this.connection);
    info('Initialized tables in SQLite database');
  }

  async disconnect(): Promise<void> {
    info('Disconnecting from SQLite database');
    await this.connection.close();
    info('Disconnected from SQLite database');
  }
}

export default SQLiteDB;
