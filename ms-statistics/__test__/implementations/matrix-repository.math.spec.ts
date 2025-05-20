import { strictEqual } from 'node:assert';
import { describe, it, mock } from 'node:test';
import { MathMatrixRepository } from 'src/infrastructure/implementations/matrix';

const repository = new MathMatrixRepository();

describe('Matrix Repository', () => {
  describe('max', () => {
    it('should return the maximum value in the matrix', async () => {
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];

      const result = await repository.max(matrix);

      strictEqual(result, 9);
    });
  });

  describe('min', () => {
    it('should return the minimum value in the matrix', async () => {
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];

      const result = await repository.min(matrix);

      strictEqual(result, 1);
    });
  });

  describe('average', () => {
    it('should return the average value of the matrix', async () => {
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];

      const result = await repository.average(matrix);

      strictEqual(result, 5);
    });

    it('should call "sum" method once', async () => {
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];

      const sumSpy = mock.method(repository, 'sum');

      await repository.average(matrix);

      strictEqual(sumSpy.mock.callCount(), 1);
    });
  });

  describe('sum', () => {
    it('should return the sum of all values in the matrix', async () => {
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];

      const result = await repository.sum(matrix);

      strictEqual(result, 45);
    });
  });

  describe('isDiagonal', () => {
    it('should return true for a diagonal matrix', async () => {
      const matrix = [
        [1, 0, 0],
        [0, 2, 0],
        [0, 0, 3],
      ];

      const result = await repository.isDiagonal(matrix);

      strictEqual(result, true);
    });

    it('should return false for a non-diagonal matrix', async () => {
      const matrix = [
        [1, 2, 0],
        [0, 3, 4],
        [5, 0, 6],
      ];

      const result = await repository.isDiagonal(matrix);

      strictEqual(result, false);
    });
  });
});
