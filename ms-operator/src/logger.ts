import type { LoggerFactory } from './helpers/utils/logger/factory';
import { WinstonLogger } from './helpers/utils/logger/winston';

export const logger: LoggerFactory = new WinstonLogger();
