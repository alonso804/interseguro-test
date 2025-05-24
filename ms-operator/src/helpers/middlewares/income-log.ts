import type { NextFunction, Request, Response } from 'express';
import { UnhaldeledHTTPMethodError } from 'src/errors/http/unhandled-http-method';
import { logger } from 'src/logger';
import { randomUUID } from 'node:crypto';

type IncomeLog = {
  method: string;
  path: string;
  body?: unknown;
  query?: unknown;
  params?: unknown;
  traceId: unknown;
};

const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

const incomeLog = (req: Request, _res: Response, next: NextFunction): void => {
  const traceId = randomUUID();
  req.headers['x-trace-id'] = traceId;

  const log: IncomeLog = { method: req.method, path: req.path, traceId: req.headers['x-trace-id'] };

  switch (req.method) {
    case HTTP_METHOD.GET:
      log.params = req.params;
      log.query = req.query;
      break;
    case HTTP_METHOD.DELETE:
      log.params = req.params;
      break;
    case HTTP_METHOD.POST:
      log.body = req.body;
      break;
    case HTTP_METHOD.PUT:
    case HTTP_METHOD.PATCH:
      log.params = req.params;
      log.body = req.body;
      break;
    default:
      throw new UnhaldeledHTTPMethodError(req.method);
  }

  logger.info(log);

  next();
};

export default incomeLog;
