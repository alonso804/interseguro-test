import { Router } from 'express';

import { getStatisticsSchema } from './get-statistics';
import { container, CTRL } from '../dependencies';
import { validateSchema } from '../../helpers/middlewares/validate-schema';
import { handler } from '../../helpers/utils/handler';

const router = Router();

router.post(
  '/get-statistics',
  validateSchema(getStatisticsSchema),
  handler(container, CTRL.getStatistics),
);

export { router };
