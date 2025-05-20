import express from 'express';
import { CONFIG } from './config';
import { expressApp } from './express-app';

function startServer() {
  const app = express();

  const server = expressApp(app);

  app
    .listen(CONFIG.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`🚀 Server is running on port ${CONFIG.PORT}`);
    })
    .on('error', (err) => {
      // eslint-disable-next-line no-console
      console.error('Error starting server:', err);
      process.exit(1);
    });

  return server;
}

startServer();
