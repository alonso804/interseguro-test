import { STATUS_CODE } from 'src/helpers/constants/http';
import { HttpBaseError } from './base-error';

export class BadRequest extends HttpBaseError {
  constructor(errors: Record<string, string[]>) {
    super(STATUS_CODE.BAD_REQUEST_400, JSON.stringify(errors));
  }
}
