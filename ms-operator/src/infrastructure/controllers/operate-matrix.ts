import type { PostHandler } from 'src/helpers/types/express';
import { STATUS_CODE } from 'src/helpers/constants/http';
import z from 'zod';
import { LoggerFactory } from 'src/helpers/utils/logger/factory';
import { HttpCtrl } from 'src/helpers/types/business';
import {
  MatrixOperatorRequest,
  MatrixOperatorResponse,
  matrixOperatorSchema,
} from 'src/application/matrix-operator/dto';
import { MatrixOperator } from 'src/application/matrix-operator';

export const operateMatrixSchema = z.object({
  body: matrixOperatorSchema,
});

export class OperateMatrixController implements HttpCtrl {
  #matrixOperator: MatrixOperator;
  #logger: LoggerFactory;

  constructor(dependencies: { matrixOperator: MatrixOperator; logger: LoggerFactory }) {
    this.#matrixOperator = dependencies.matrixOperator;
    this.#logger = dependencies.logger;
  }

  run: PostHandler<MatrixOperatorRequest, MatrixOperatorResponse> = async (req, res) => {
    const response = await this.#matrixOperator.run(req.body);

    this.#logger.info(`Response: ${JSON.stringify(response)}`);

    res.status(STATUS_CODE.OK_200).json(response);
  };
}
