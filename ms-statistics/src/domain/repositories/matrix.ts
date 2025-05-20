import type { Matrix } from '../models/matrix';

export interface MatrixRepository {
  max(matrix: Matrix): Promise<number>;

  min(matrix: Matrix): Promise<number>;

  average(matrix: Matrix): Promise<number>;

  sum(matrix: Matrix): Promise<number>;

  isDiagonal(matrix: Matrix): Promise<boolean>;
}
