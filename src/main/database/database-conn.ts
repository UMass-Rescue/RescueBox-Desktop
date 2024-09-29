/* eslint-disable no-bitwise */
/* eslint-disable no-use-before-define */
import { Sequelize } from 'sequelize';
import SQLiteDB from './sqlite-db';

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
}
