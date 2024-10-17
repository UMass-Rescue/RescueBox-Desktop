import log from 'electron-log/main';
import { Sequelize } from 'sequelize';
import { SequelizeStorage, Umzug } from 'umzug';
import migration0000Models from './0000_models';
import migration0001Jobs from './0001_jobs';
import migration0002Servers from './0002_servers';
import migration0003ServersAddCol from './0003_servers_add_col';
import migration0004JobsDropOutputs from './0004_jobs_drop_outputs';

export default function getMigrationsUmzug(sequelize: Sequelize) {
  return new Umzug({
    storage: new SequelizeStorage({ sequelize }),
    context: sequelize.getQueryInterface(),
    migrations: [
      migration0000Models,
      migration0001Jobs,
      migration0002Servers,
      migration0003ServersAddCol,
      migration0004JobsDropOutputs,
    ],
    logger: log,
  });
}
