import type { Matrix } from '../models/matrix';

export type QRDecomposition = {
  Q: Matrix;
  R: Matrix;
};

export interface MatrixRepository {
  rotate(matrix: Matrix, times: number): Promise<Matrix>;

  qrDecomposition(matrix: Matrix): Promise<QRDecomposition>;
}
