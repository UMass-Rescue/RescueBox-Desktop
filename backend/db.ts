import sqlite3 from 'sqlite3';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('database', 'user', 'password', {
  dialect: 'sqlite',
  dialectModule: sqlite3,
});

// export const initDatabase = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connected to database.');

//     await sequelize.sync({ alter: true });
//     console.log('Database has been synchronized.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// };

export default sequelize;
