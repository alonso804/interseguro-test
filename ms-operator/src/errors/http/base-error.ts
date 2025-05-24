import { STATUS_CODE } from 'src/helpers/constants/http';
import { StatusCode } from 'src/helpers/types';

export class HttpBaseError extends Error {
  constructor(
    public status: StatusCode = STATUS_CODE.INTERNAL_SERVER_ERROR_500,
    message: string,
  ) {
    super(message);
    this.status = status;
  }
}
