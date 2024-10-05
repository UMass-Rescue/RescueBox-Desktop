import {
  JobHandler,
  ModelsHandler,
  RegistrationHandler,
  FileSystemHandler,
  DatabaseHandler,
} from '../main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    registration: RegistrationHandler;
    models: ModelsHandler;
    job: JobHandler;
    fileSystem: FileSystemHandler;
    database: DatabaseHandler;
  }
}

export {};
