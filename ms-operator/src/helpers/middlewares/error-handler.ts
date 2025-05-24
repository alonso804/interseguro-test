import type { NextFunction, Request, Response } from 'express';
import { HttpBaseError } from 'src/errors/http/base-error';
import { logger } from 'src/logger';
import { BadRequest } from 'src/errors/http/bad-request';

const errorHandler = (error: Error, req: Request, res: Response, _next: NextFunction): void => {
  const response = {
    status: 500,
    message: 'Internal Server Error',
  };

  if (error instanceof HttpBaseError) {
    response.status = error.status;
    response.message = error.message;

    if (error instanceof BadRequest) {
      response.message = JSON.parse(error.message);
    }
  }

  const traceId = req.headers['x-trace-id'] ?? 'no-trace-id';

  logger.error({ message: error.message, status: response.status, traceId });

  res
    .set({
      'x-status-code': response.status,
      'x-trace-id': traceId,
    })
    .status(response.status)
    .send({ message: response.message });
};

export default errorHandler;
