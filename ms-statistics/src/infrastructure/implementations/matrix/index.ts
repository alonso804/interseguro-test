import type { Matrix } from 'src/domain/models/matrix';
import type { MatrixRepository } from 'src/domain/repositories/matrix';

export class MathMatrixRepository implements MatrixRepository {
  max(matrix: Matrix): Promise<number> {
    let maxValue = Number.MIN_VALUE;

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] > maxValue) {
          maxValue = matrix[i][j];
        }
      }
    }

    return Promise.resolve(maxValue);
  }

  min(matrix: Matrix): Promise<number> {
    let minValue = Number.MAX_VALUE;

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] < minValue) {
          minValue = matrix[i][j];
        }
      }
    }

    return Promise.resolve(minValue);
  }

  async average(matrix: Matrix): Promise<number> {
    const sum = await this.sum(matrix);
    const count = matrix.length * matrix[0].length;

    const average = sum * Math.pow(count, -1);

    return Promise.resolve(average);
  }

  sum(matrix: Matrix): Promise<number> {
    let sum = 0;

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        sum += matrix[i][j];
      }
    }

    return Promise.resolve(sum);
  }

  isDiagonal(matrix: Matrix): Promise<boolean> {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (i !== j && matrix[i][j] !== 0) {
          return Promise.resolve(false);
        }
      }
    }

    return Promise.resolve(true);
  }
}
