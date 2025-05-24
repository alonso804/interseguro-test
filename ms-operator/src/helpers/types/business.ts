import { RequestHandler } from 'express';

export interface HttpCtrl {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  run: RequestHandler<any, any, any, any>;
}
