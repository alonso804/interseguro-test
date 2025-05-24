import { asClass, createContainer } from 'awilix';
import { OperateMatrixController } from '../controllers/operate-matrix';
import { WinstonLogger } from 'src/helpers/utils/logger/winston';
import { MathMatrixRepository } from '../implementations/matrix';
import { MatrixOperator } from 'src/application/matrix-operator';

export const container = createContainer({
  injectionMode: 'PROXY',
});

export const CTRL = {
  operateMatrix: 'operateMatrix',
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
  matrixOperator: asClass(MatrixOperator),
});

// Controllers
container.register({
  [CTRL.operateMatrix]: asClass(OperateMatrixController),
});
