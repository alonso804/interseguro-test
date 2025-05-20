import { asClass, asValue, createContainer } from 'awilix';
import { OperateMatrixController } from '../controllers/operate-matrix';
import { WinstonLogger } from 'src/helpers/utils/logger/winston';
import { MsMatrixRepository } from '../implementations/matrix';
import { MatrixOperator } from 'src/application/matrix-operator';
import { UserLogin } from 'src/application/user-login';
import { UserRegister } from 'src/application/user-register';
import { LibSQLAuthRepository } from '../implementations/auth';
import { libSQLClient } from 'src/db/libsql';
import { SignUpController } from '../controllers/signup';
import { LoginController } from '../controllers/login';

export const container = createContainer({
  injectionMode: 'PROXY',
});

export const CTRL = {
  operateMatrix: 'operateMatrix',
  login: 'login',
  signUp: 'signUp',
} as const;

export type Ctrl = (typeof CTRL)[keyof typeof CTRL];

container.register({
  logger: asClass(WinstonLogger).singleton(),
  libSQLClient: asValue(libSQLClient),
});

// Implementations
container.register({
  matrixRepository: asClass(MsMatrixRepository),
  authRepository: asClass(LibSQLAuthRepository),
});

// Services
container.register({
  matrixOperator: asClass(MatrixOperator),
  userLogin: asClass(UserLogin),
  userRegister: asClass(UserRegister),
});

// Controllers
container.register({
  [CTRL.operateMatrix]: asClass(OperateMatrixController),
  [CTRL.login]: asClass(LoginController),
  [CTRL.signUp]: asClass(SignUpController),
});
