import { STATUS_CODE } from 'src/helpers/constants/http';
import { StatusCode } from 'src/helpers/types';
import { HttpBaseError } from './base-error';

export class FetchError extends HttpBaseError {
  constructor(statusCode: StatusCode = STATUS_CODE.INTERNAL_SERVER_ERROR_500, message: string) {
    super(statusCode, message);
  }
}
