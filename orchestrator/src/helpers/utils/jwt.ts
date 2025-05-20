import jwt from 'jsonwebtoken';
import { CONFIG } from 'src/config';
import { InvalidJwtError } from 'src/errors/http/invalid-jwt';

const JWT_EXPIRATION = '1h';

export const createToken = (content: { email: string }): string => {
  const token = jwt.sign(content, CONFIG.JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });

  return token;
};

export const verifyToken = (token: string): { email: string } => {
  try {
    const decoded = jwt.verify(token, CONFIG.JWT_SECRET) as { email: string };

    return decoded;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new InvalidJwtError();
  }
};
