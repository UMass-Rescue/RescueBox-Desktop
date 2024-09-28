import { JobHandler, RegistrationHandler } from '../main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    registration: RegistrationHandler;
    job: JobHandler;
  }
}

export {};
