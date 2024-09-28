/* eslint-disable no-use-before-define */
import BaseDB from './base';
import FakeDB from './fake-db';
import SQLiteDB from './sqlite-db';

export default class DatabaseConn {
  private db: BaseDB;

  static #instance: DatabaseConn | null = null;

  constructor(db: BaseDB) {
    this.db = db;
  }

  static async getDatabase(env: 'fake' | 'prod'): Promise<BaseDB> {
    if (!DatabaseConn.#instance) {
      const db = env === 'fake' ? new FakeDB() : new SQLiteDB();
      await db.connect();
      DatabaseConn.#instance = new DatabaseConn(db);
    }
    return DatabaseConn.#instance.db;
  }
}
