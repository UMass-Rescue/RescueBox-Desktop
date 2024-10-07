import {
  JobHandler,
  ModelsHandler,
  RegistrationHandler,
  FileSystemHandler,
  DatabaseHandler,
  LoggingHandler,
} from '../main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    registration: RegistrationHandler;
    models: ModelsHandler;
    job: JobHandler;
    fileSystem: FileSystemHandler;
    database: DatabaseHandler;
    logging: LoggingHandler;
  }
}

export {};
