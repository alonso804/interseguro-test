/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LoggerFactory {
  info: (message: any) => LoggerFactory;

  error: (message: any) => LoggerFactory;

  warn: (message: any) => LoggerFactory;

  debug: (message: any) => LoggerFactory;

  child: (options: object) => LoggerFactory;
}
