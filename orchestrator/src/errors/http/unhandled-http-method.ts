import { STATUS_CODE } from 'src/helpers/constants/http';
import { HttpBaseError } from './base-error';

export class UnhaldeledHTTPMethodError extends HttpBaseError {
  constructor(method: string) {
    super(STATUS_CODE.NOT_FOUND_404, `Unhandled HTTP Method: ${method}`);
  }
}
