/* eslint-disable class-methods-use-this */
import { info } from 'console';
import BaseDB from './base';

class FakeDB implements BaseDB {
  async connect(): Promise<void> {
    info('Connecting to fake database');
  }

  async disconnect(): Promise<void> {
    info('Disconnecting from fake database');
  }
}

export default FakeDB;
