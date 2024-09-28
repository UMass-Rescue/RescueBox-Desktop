/* eslint-disable no-bitwise */
/* eslint-disable no-use-before-define */
import { Sequelize } from 'sequelize';

export default class DatabaseConn {
  private db: Sequelize;

  static #instance: DatabaseConn | null = null;

  constructor(dbPath: string) {
    this.db = new Sequelize({
      dialect: 'sqlite',
      storage: dbPath,
    });
  }

  static async getDatabase(dbPath: string): Promise<Sequelize> {
    if (!DatabaseConn.#instance) {
      DatabaseConn.#instance = new DatabaseConn(dbPath);
    }
    return DatabaseConn.#instance.db;
  }
}
