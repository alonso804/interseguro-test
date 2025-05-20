import axios from 'axios';
import { CONFIG } from 'src/config';
import type { Matrix } from 'src/domain/models/matrix';
import type {
  MatrixRepository,
  OperateResponse,
  StatisticsResponse,
} from 'src/domain/repositories/matrix';

type MsOperatorResponse = {
  rotatedMatrix: Matrix;
  qrDecomposition: {
    Q: Matrix;
    R: Matrix;
  };
};

type MsStatisticsResponse = {
  max: number;
  min: number;
  average: number;
  sum: number;
  isDiagonal: boolean;
};

export class MsMatrixRepository implements MatrixRepository {
  async operateMatrix(matrix: Matrix): Promise<OperateResponse> {
    const response = await axios.post<MsOperatorResponse>(
      `${CONFIG.MS_OPERATOR_URL}/operate-matrix`,
      { matrix },
    );

    const { rotatedMatrix, qrDecomposition } = response.data;

    return {
      rotated: rotatedMatrix,
      Q: qrDecomposition.Q,
      R: qrDecomposition.R,
    };
  }

  async getStatistics(matrix: Matrix, Q: Matrix, R: Matrix): Promise<StatisticsResponse> {
    const response = await axios.post<MsStatisticsResponse>(
      `${CONFIG.MS_STATISTICS_URL}/get-statistics`,
      { matrix, Q, R },
    );

    return response.data;
  }
}
