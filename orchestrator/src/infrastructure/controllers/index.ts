import { Router } from 'express';
import { operateMatrixSchema } from './operate-matrix';
import { container, CTRL } from '../dependencies';
import { validateSchema } from '../../helpers/middlewares/validate-schema';
import { handler } from '../../helpers/utils/handler';
import { validateJwt } from 'src/helpers/middlewares/validate-jwt';
import { loginSchema } from './login';
import { signUpSchema } from './signup';

const router = Router();

router.post(
  '/operate-matrix',
  validateSchema(operateMatrixSchema),
  validateJwt,
  handler(container, CTRL.operateMatrix),
);

router.post('/login', validateSchema(loginSchema), handler(container, CTRL.login));

router.post('/signup', validateSchema(signUpSchema), handler(container, CTRL.signUp));

export { router };
