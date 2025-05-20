import { strictEqual } from 'node:assert';
import { describe, it } from 'node:test';
import { MathMatrixRepository } from 'src/infrastructure/implementations/matrix';

const APPROXIMATE_EQUALITY = 1e-10;

const repository = new MathMatrixRepository();

describe('Matrix Repository', () => {
  describe('rotate', () => {
    it('should rotate the matrix clockwise with "1" as rotation times', async () => {
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      const expected = [
        [7, 4, 1],
        [8, 5, 2],
        [9, 6, 3],
      ];

      const result = await repository.rotate(matrix, 1);
      strictEqual(JSON.stringify(result), JSON.stringify(expected));
    });

    it.only('should rotate the matrix clockwise with "-3" as rotation times', async () => {
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      const expected = [
        [7, 4, 1],
        [8, 5, 2],
        [9, 6, 3],
      ];

      const result = await repository.rotate(matrix, -3);
      strictEqual(JSON.stringify(result), JSON.stringify(expected));
    });

    it('should rotate the matrix counterclockwise with "-1" as rotation times', async () => {
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      const expected = [
        [3, 6, 9],
        [2, 5, 8],
        [1, 4, 7],
      ];

      const result = await repository.rotate(matrix, -1);
      strictEqual(JSON.stringify(result), JSON.stringify(expected));
    });

    it('should rotate the matrix counterclockwise with "3" as rotation times', async () => {
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      const expected = [
        [3, 6, 9],
        [2, 5, 8],
        [1, 4, 7],
      ];

      const result = await repository.rotate(matrix, 3);
      strictEqual(JSON.stringify(result), JSON.stringify(expected));
    });

    it('should rotate the matrix by 180 degrees with "2" as rotation times', async () => {
      const matrix = [
        [1, 2],
        [3, 4],
      ];
      const expected = [
        [4, 3],
        [2, 1],
      ];

      const result = await repository.rotate(matrix, -2);
      strictEqual(JSON.stringify(result), JSON.stringify(expected));
    });

    it('should rotate the matrix by 180 degrees with "-2" as rotation times', async () => {
      const matrix = [
        [1, 2],
        [3, 4],
      ];
      const expected = [
        [4, 3],
        [2, 1],
      ];

      const result = await repository.rotate(matrix, 2);
      strictEqual(JSON.stringify(result), JSON.stringify(expected));
    });
  });

  describe('qrDecomposition', () => {
    it('should return the QR decomposition of a matrix', async () => {
      const matrix = [
        [1, -1, 4],
        [1, 4, -2],
        [1, 4, 2],
        [1, -1, 0],
      ];

      const expectedQ = [
        [0.5, -0.5, 0.5],
        [0.5, 0.5, -0.5],
        [0.5, 0.5, 0.5],
        [0.5, -0.5, -0.5],
      ];

      const expectedR = [
        [2, 3, 2],
        [0, 5, -2],
        [0, 0, 4],
        [0, 0, 0],
      ];

      const { Q, R } = await repository.qrDecomposition(matrix);

      let qCheck = true;
      let rCheck = true;

      for (let i = 0; i < expectedQ.length; i++) {
        for (let j = 0; j < expectedQ[i].length; j++) {
          if (Math.abs(Q[i][j] - expectedQ[i][j]) > APPROXIMATE_EQUALITY) {
            qCheck = false;
          }
        }
      }
      for (let i = 0; i < expectedR.length; i++) {
        for (let j = 0; j < expectedR[i].length; j++) {
          if (Math.abs(R[i][j] - expectedR[i][j]) > APPROXIMATE_EQUALITY) {
            rCheck = false;
          }
        }
      }

      strictEqual(qCheck, true, 'Q matrix does not match expected value');
      strictEqual(rCheck, true, 'R matrix does not match expected value');
    });
  });
});
