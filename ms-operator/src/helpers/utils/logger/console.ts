/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoggerFactory } from './factory';

export class ConsoleLogger implements LoggerFactory {
  info = (message: any) => {
    console.log(message);

    return this;
  };

  error = (message: any) => {
    console.error(message);

    return this;
  };

  warn = (message: any) => {
    console.warn(message);

    return this;
  };

  debug = (message: any) => {
    console.debug(message);

    return this;
  };

  child = (_options: object) => {
    return this;
  };
}
