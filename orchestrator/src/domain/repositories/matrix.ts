import type { Matrix } from '../models/matrix';

export type OperateResponse = {
  rotated: Matrix;
  Q: Matrix;
  R: Matrix;
};

export type StatisticsResponse = {
  max: number;
  min: number;
  average: number;
  sum: number;
  isDiagonal: boolean;
};

export interface MatrixRepository {
  operateMatrix: (matrix: Matrix) => Promise<OperateResponse>;

  getStatistics: (matrix: Matrix, Q: Matrix, R: Matrix) => Promise<StatisticsResponse>;
}
