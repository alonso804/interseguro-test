import { InvalidJwtError } from 'src/errors/http/invalid-jwt';
import { verifyToken } from 'src/helpers/utils/jwt';
import type { NextFunction, Request, Response } from 'express';

export const validateJwt = (req: Request, _res: Response, next: NextFunction): void => {
  const [type, token] = (req.headers['authorization'] as string | undefined)?.split(' ') ?? [];

  if (type !== 'Bearer' || !token) {
    throw new InvalidJwtError();
  }

  verifyToken(token);

  next();
};
