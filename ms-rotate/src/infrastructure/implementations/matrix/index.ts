import type { Matrix } from 'src/domain/models/matrix';
import type { MatrixRepository, QRDecomposition } from 'src/domain/repositories/matrix';
import { qr } from 'mathjs';

const MAX_ROTATIONS = 4;

export class MathMatrixRepository implements MatrixRepository {
  #rotateClockwise(matrix: Matrix): Promise<Matrix> {
    const rowsLength = matrix.length;
    const columnsLength = matrix[0].length;

    const rotatedMatrix: Matrix = Array.from({ length: columnsLength }, () =>
      Array(rowsLength).fill(0),
    );

    for (let i = 0; i < rowsLength; i++) {
      for (let j = 0; j < columnsLength; j++) {
        rotatedMatrix[j][rowsLength - 1 - i] = matrix[i][j];
      }
    }

    return Promise.resolve(rotatedMatrix);
  }

  #rotateCounterClockwise(matrix: Matrix): Promise<Matrix> {
    const rowsLength = matrix.length;
    const columnsLength = matrix[0].length;

    const rotatedMatrix: Matrix = Array.from({ length: columnsLength }, () =>
      Array(rowsLength).fill(0),
    );

    for (let i = 0; i < rowsLength; i++) {
      for (let j = 0; j < columnsLength; j++) {
        rotatedMatrix[columnsLength - 1 - j][i] = matrix[i][j];
      }
    }
    return Promise.resolve(rotatedMatrix);
  }

  async #rotate180(matrix: Matrix): Promise<Matrix> {
    const rowsLength = matrix.length;
    const columnsLength = matrix[0].length;

    const rotatedMatrix: Matrix = Array.from({ length: rowsLength }, () =>
      Array(columnsLength).fill(0),
    );

    for (let i = 0; i < rowsLength; i++) {
      for (let j = 0; j < columnsLength; j++) {
        rotatedMatrix[rowsLength - 1 - i][columnsLength - 1 - j] = matrix[i][j];
      }
    }

    return Promise.resolve(rotatedMatrix);
  }

  rotate(matrix: Matrix, times: number): Promise<Matrix> {
    const rotations = times % MAX_ROTATIONS;

    if (rotations === 0) {
      return Promise.resolve(matrix);
    } else if (rotations === 1 || rotations === -3) {
      return this.#rotateClockwise(matrix);
    } else if (rotations === 2 || rotations === -2) {
      return this.#rotate180(matrix);
    }

    return this.#rotateCounterClockwise(matrix);
  }

  qrDecomposition(matrix: Matrix): Promise<QRDecomposition> {
    const { Q, R } = qr(matrix);

    return Promise.resolve({ Q, R } as QRDecomposition);
  }
}
