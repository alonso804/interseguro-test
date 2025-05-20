import { STATUS_CODE } from 'src/helpers/constants/http';
import { HttpBaseError } from './base-error';

export class InvalidUserError extends HttpBaseError {
  constructor(email: string) {
    super(STATUS_CODE.UNAUTHORIZED_401, `Invalid user <${email}>`);
  }
}
