import { StatusCode } from 'src/helpers/types';
import { HttpBaseError } from './base-error';

export class SQLError extends HttpBaseError {
  constructor(statusCode: StatusCode, message: string) {
    super(statusCode, message);
  }
}
