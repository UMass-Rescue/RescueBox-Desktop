/* eslint-disable no-use-before-define */
// import SQLiteDB from './sqlite-db';

export default class DatabaseConn {
  // private db: SQLiteDB;

  static #instance: DatabaseConn | null = null;

  // constructor(db: SQLiteDB) {
  //   this.db = db;
  // }

  // static async getDatabase(): Promise<SQLiteDB> {
  //   if (!DatabaseConn.#instance) {
  //     const db = new SQLiteDB();
  //     await db.connect();
  //     DatabaseConn.#instance = new DatabaseConn(db);
  //   }
  //   return DatabaseConn.#instance.db;
  // }
}
