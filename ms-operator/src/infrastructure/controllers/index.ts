import { Router } from 'express';

import { operateMatrixSchema } from './operate-matrix';
import { container, CTRL } from '../dependencies';
import { validateSchema } from '../../helpers/middlewares/validate-schema';
import { handler } from '../../helpers/utils/handler';

const router = Router();

router.post(
  '/operate-matrix',
  validateSchema(operateMatrixSchema),
  handler(container, CTRL.operateMatrix),
);

export { router };
