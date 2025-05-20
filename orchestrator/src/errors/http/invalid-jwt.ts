import { STATUS_CODE } from 'src/helpers/constants/http';
import { HttpBaseError } from './base-error';

export class InvalidJwtError extends HttpBaseError {
  constructor() {
    super(STATUS_CODE.UNAUTHORIZED_401, `Invalid JWT token`);
  }
}
