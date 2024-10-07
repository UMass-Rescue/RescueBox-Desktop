/* eslint-disable no-bitwise */
/* eslint-disable no-use-before-define */
import { Sequelize } from 'sequelize';
import Main from 'electron/main';
import path from 'path';
import { log } from 'electron-log/main';
import SQLiteDB from './sqlite-db';

export function getDbPath(app: Main.App): string {
  return path.join(app.getPath('userData'), 'rbox-data.db');
}

export default class DatabaseConn {
  private db: SQLiteDB;

  static #instance: DatabaseConn | null = null;

  constructor(dbPath: string) {
    const conn = new Sequelize({
      dialect: 'sqlite',
      storage: dbPath,
      logging: false,
    });
    this.db = new SQLiteDB(conn);
  }

  static async initDatabase(dbPath: string): Promise<void> {
    if (!DatabaseConn.#instance) {
      DatabaseConn.#instance = new DatabaseConn(dbPath);
      await DatabaseConn.#instance.db.connect();
    }
  }

  static async resetDatabase(dbPath: string): Promise<void> {
    if (!DatabaseConn.#instance) {
      DatabaseConn.#instance = new DatabaseConn(dbPath);
    }
    log('Resetting database');
    await DatabaseConn.#instance.db.connect();
    return DatabaseConn.#instance.db.resetTables();
  }

  static async resetDummyData(dbPath: string): Promise<void> {
    if (!DatabaseConn.#instance) {
      DatabaseConn.#instance = new DatabaseConn(dbPath);
    }
    log('Resetting dummy data');
    await DatabaseConn.#instance.db.connect();
    return DatabaseConn.#instance.db.resetDummyData();
  }

  static async initDatabaseTest(dbPath: string): Promise<void> {
    if (!DatabaseConn.#instance) {
      DatabaseConn.#instance = new DatabaseConn(dbPath);
      await DatabaseConn.#instance.db.connect();
      await DatabaseConn.#instance.db.clearDummyData();
      await DatabaseConn.#instance.db.initDummyData();
    }
  }
}
