import { asValue, AwilixContainer } from 'awilix';
import type { Ctrl as KitchenCtrl } from 'src/infrastructure/dependencies';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import { HttpCtrl } from '../types/business';
import { LoggerFactory } from './logger/factory';

type Instance = KitchenCtrl;

const getControllerInstance = (
  container: AwilixContainer,
  instance: Instance,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const logger = container.resolve<LoggerFactory>('logger');

  const requestLogger = logger.child({
    traceId: req.headers['x-trace-id'] ?? 'no-trace-id',
  });

  const requestContainer = container.createScope();

  requestContainer.register({
    logger: asValue(requestLogger),
  });

  const controllerInstance = requestContainer.resolve<HttpCtrl>(instance);

  return (controllerInstance.run(req, res, next) as Promise<void>).catch(next);
};

export const handler =
  (container: AwilixContainer, instance: Instance): RequestHandler =>
  async (req, res, next) => {
    return getControllerInstance(container, instance, req, res, next);
  };
