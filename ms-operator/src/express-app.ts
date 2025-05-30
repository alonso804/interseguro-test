import express, { Express } from 'express';
import errorHandler from './helpers/middlewares/error-handler';
import { router } from './infrastructure/controllers';
import incomeLog from './helpers/middlewares/income-log';
import { createServer, Server as HttpServer } from 'http';

export const expressApp = (app: Express): HttpServer => {
  const server = createServer(app);

  /* HTTP */
  app.use(express.json());
  // app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  // app.use(cors());

  app.use(incomeLog);

  // API
  app.use('/', router);

  app.get('/health-check', (_req, res) => {
    res.status(200).send('[MS-OPERATOR] Health check passed!');
  });

  app.use(errorHandler);

  return server;
};
