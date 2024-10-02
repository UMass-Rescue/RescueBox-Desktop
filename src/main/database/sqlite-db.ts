import { error, info } from 'electron-log';
import { Sequelize } from '@sequelize/core';

class SQLiteDB {
  private connection: Sequelize;

  constructor(conn: Sequelize) {
    this.connection = conn;
  }

  async connect(): Promise<void> {
    try {
      info('Connecting to SQLite database');
      await this.connection.authenticate();
      await this.connection.sync({ alter: true });
      info('Connected to SQLite database');
    } catch (err) {
      error('Unable to connect to SQLite database', err);
    }
  }

  async disconnect(): Promise<void> {
    info('Disconnecting from SQLite database');
    await this.connection.close();
    info('Disconnected from SQLite database');
  }
}

export default SQLiteDB;
