import { RegistrationHandler } from '../main/preload';
import {
  JobHandler,
  RegistrationHandler,
} from '../main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    registration: RegistrationHandler;
    job: JobHandler;
  }
}

export {};
