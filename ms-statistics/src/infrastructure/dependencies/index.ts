import { asClass, createContainer } from 'awilix';
import { GetStatisticsController } from '../controllers/get-statistics';
import { WinstonLogger } from 'src/helpers/utils/logger/winston';
import { MathMatrixRepository } from '../implementations/matrix';
import { StatisticsGetter } from 'src/application/statistics-getter';

export const container = createContainer({
  injectionMode: 'PROXY',
});

export const CTRL = {
  getStatistics: 'getStatistics',
} as const;

export type Ctrl = (typeof CTRL)[keyof typeof CTRL];

container.register({
  logger: asClass(WinstonLogger).singleton(),
});

// Implementations
container.register({
  matrixRepository: asClass(MathMatrixRepository),
});

// Services
container.register({
  statisticsGetter: asClass(StatisticsGetter),
});

// Controllers
container.register({
  [CTRL.getStatistics]: asClass(GetStatisticsController),
});
