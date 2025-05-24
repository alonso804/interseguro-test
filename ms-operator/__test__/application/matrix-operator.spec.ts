import { strictEqual } from 'node:assert';
import { describe, it, mock } from 'node:test';
import { MatrixOperator } from 'src/application/matrix-operator';
import { MathMatrixRepository } from 'src/infrastructure/implementations/matrix';

const mathMatrixRepository = new MathMatrixRepository();

const matrixOperator = new MatrixOperator({
  matrixRepository: mathMatrixRepository,
});

describe('Matrix Operator', () => {
  it('should call the "rotate" method of the matrix repository', async () => {
    const rotateSpy = mock.method(mathMatrixRepository, 'rotate');

    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    const rotateTimes = 1;

    await matrixOperator.run({ matrix, rotateTimes });

    strictEqual(rotateSpy.mock.callCount(), 1);
  });

  it('should call the "qrDecomposition" method of the matrix repository', async () => {
    const qrDecompositionSpy = mock.method(mathMatrixRepository, 'qrDecomposition');

    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const rotateTimes = 1;

    await matrixOperator.run({ matrix, rotateTimes });

    strictEqual(qrDecompositionSpy.mock.callCount(), 1);
  });

  it('should return the rotated matrix and QR decomposition', async () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const rotateTimes = 1;

    const result = await matrixOperator.run({ matrix, rotateTimes });

    strictEqual(
      Array.isArray(result.rotatedMatrix) && Array.isArray(result.rotatedMatrix[0]),
      true,
    );

    strictEqual(
      Array.isArray(result.qrDecomposition.Q) && Array.isArray(result.qrDecomposition.Q[0]),
      true,
    );

    strictEqual(
      Array.isArray(result.qrDecomposition.R) && Array.isArray(result.qrDecomposition.R[0]),
      true,
    );
  });
});
