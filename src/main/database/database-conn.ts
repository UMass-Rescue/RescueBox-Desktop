/* eslint-disable no-bitwise */
/* eslint-disable no-use-before-define */
import { Sequelize } from '@sequelize/core';
import { SqliteDialect } from '@sequelize/sqlite3';
import SQLiteDB from './sqlite-db';
import Job from '../models/job';
import MLModel from '../models/ml-model';
import ModelServer from '../models/model-server';

export default class DatabaseConn {
  private db: SQLiteDB;

  static #instance: DatabaseConn | null = null;

  constructor(dbPath: string) {
    const conn = new Sequelize({
      dialect: SqliteDialect,
      storage: dbPath,
      logging: false,
      foreignKeys: true,
      models: [Job, MLModel, ModelServer],
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
