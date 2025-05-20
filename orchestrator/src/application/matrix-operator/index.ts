import type { MatrixRepository } from 'src/domain/repositories/matrix';
import type { MatrixOperatorRequest, MatrixOperatorResponse } from './dto';

export class MatrixOperator {
  #matrixRepository: MatrixRepository;

  constructor(dependencies: { matrixRepository: MatrixRepository }) {
    this.#matrixRepository = dependencies.matrixRepository;
  }

  async run({ matrix }: MatrixOperatorRequest): Promise<MatrixOperatorResponse> {
    const { rotated, Q, R } = await this.#matrixRepository.operateMatrix(matrix);

    const { max, min, average, sum, isDiagonal } = await this.#matrixRepository.getStatistics(
      rotated,
      Q,
      R,
    );

    return {
      rotatedMatrix: rotated,
      Q,
      R,
      max,
      min,
      average,
      sum,
      isDiagonal,
    };
  }
}
