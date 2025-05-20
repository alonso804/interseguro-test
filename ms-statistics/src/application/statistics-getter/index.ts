import type { MatrixRepository } from 'src/domain/repositories/matrix';
import type { StatisticsGetterRequest, StatisticsGetterResponse } from './dto';
import type { Matrix } from 'src/domain/models/matrix';

export class StatisticsGetter {
  #matrixRepository: MatrixRepository;

  constructor(dependencies: { matrixRepository: MatrixRepository }) {
    this.#matrixRepository = dependencies.matrixRepository;
  }

  async #getStatistics(matrix: Matrix): Promise<StatisticsGetterResponse> {
    const [max, min, average, sum, isDiagonal] = await Promise.all([
      this.#matrixRepository.max(matrix),
      this.#matrixRepository.min(matrix),
      this.#matrixRepository.average(matrix),
      this.#matrixRepository.sum(matrix),
      this.#matrixRepository.isDiagonal(matrix),
    ]);

    return Promise.resolve({
      max,
      min,
      average,
      sum,
      isDiagonal,
    });
  }

  async run({ matrix, Q, R }: StatisticsGetterRequest): Promise<StatisticsGetterResponse> {
    const stats = await Promise.all([
      this.#getStatistics(matrix),
      this.#getStatistics(Q),
      this.#getStatistics(R),
    ]);

    const max = Math.max(...stats.map((stat) => stat.max));
    const min = Math.min(...stats.map((stat) => stat.min));
    const average = stats.reduce((acc, stat) => acc + stat.average, 0) * Math.pow(stats.length, -1);
    const sum = stats.reduce((acc, stat) => acc + stat.sum, 0);
    const isDiagonal = stats.some((stat) => stat.isDiagonal);

    return Promise.resolve({
      max,
      min,
      average,
      sum,
      isDiagonal,
    });
  }
}
