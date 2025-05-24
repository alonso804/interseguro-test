import type { MatrixRepository } from 'src/domain/repositories/matrix';
import type { MatrixOperatorRequest, MatrixOperatorResponse } from './dto';

export class MatrixOperator {
  #matrixRepository: MatrixRepository;

  constructor(dependencies: { matrixRepository: MatrixRepository }) {
    this.#matrixRepository = dependencies.matrixRepository;
  }

  async run({ matrix, rotateTimes }: MatrixOperatorRequest): Promise<MatrixOperatorResponse> {
    const rotatedMatrix = await this.#matrixRepository.rotate(matrix, rotateTimes);

    const { Q, R } = await this.#matrixRepository.qrDecomposition(rotatedMatrix);

    return Promise.resolve({
      rotatedMatrix,
      qrDecomposition: { Q, R },
    });
  }
}
