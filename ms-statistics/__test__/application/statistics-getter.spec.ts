import { strictEqual } from 'node:assert';
import { describe, it } from 'node:test';
import { StatisticsGetter } from 'src/application/statistics-getter';
import { MathMatrixRepository } from 'src/infrastructure/implementations/matrix';

const statisticsGetter = new StatisticsGetter({
  matrixRepository: new MathMatrixRepository(),
});

describe('Statistics Getter', () => {
  it('should return the correct statistics for a given matrix', async () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    const q = [
      [10, 11, 12],
      [13, 14, 15],
      [16, 17, 18],
    ];

    const r = [
      [19, 20, 21],
      [22, 23, 24],
      [25, 26, 27],
    ];

    const result = await statisticsGetter.run({ matrix, Q: q, R: r });

    strictEqual(result.max, 27);
    strictEqual(result.min, 1);
    strictEqual(result.average, 14);
    strictEqual(result.sum, 378);
    strictEqual(result.isDiagonal, false);
  });

  it('should return "isDiagonal" as true if at least one matrix is diagonal', async () => {
    const matrix = [
      [1, 0, 0],
      [0, 5, 0],
      [0, 0, 9],
    ];

    const q = [
      [10, 11, 12],
      [13, 14, 15],
      [16, 17, 18],
    ];

    const r = [
      [19, 20, 21],
      [22, 23, 24],
      [25, 26, 27],
    ];

    const result = await statisticsGetter.run({ matrix, Q: q, R: r });

    strictEqual(result.isDiagonal, true);
  });

  it('should return "isDiagonal" as false if no matrix is diagonal', async () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    const q = [
      [10, 11, 12],
      [13, 14, 15],
      [16, 17, 18],
    ];

    const r = [
      [19, 20, 21],
      [22, 23, 24],
      [25, 26, 27],
    ];

    const result = await statisticsGetter.run({ matrix, Q: q, R: r });

    strictEqual(result.isDiagonal, false);
  });
});
