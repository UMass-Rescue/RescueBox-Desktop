import { Sequelize } from 'sequelize';
import sqlite3 from 'sqlite3';

const sqlite3Connection = new Sequelize('database', 'user', 'password', {
  dialect: 'sqlite',
  dialectModule: sqlite3,
});

export default sqlite3Connection;
