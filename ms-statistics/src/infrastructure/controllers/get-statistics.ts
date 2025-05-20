import type { PostHandler } from 'src/helpers/types/express';
import { STATUS_CODE } from 'src/helpers/constants/http';
import z from 'zod';
import { LoggerFactory } from 'src/helpers/utils/logger/factory';
import { HttpCtrl } from 'src/helpers/types/business';
import {
  StatisticsGetterRequest,
  StatisticsGetterResponse,
  statisticsGetterSchema,
} from 'src/application/statistics-getter/dto';
import { StatisticsGetter } from 'src/application/statistics-getter';

export const getStatisticsSchema = z.object({
  body: statisticsGetterSchema,
});

export class GetStatisticsController implements HttpCtrl {
  #statisticsGetter: StatisticsGetter;
  #logger: LoggerFactory;

  constructor(dependencies: { statisticsGetter: StatisticsGetter; logger: LoggerFactory }) {
    this.#statisticsGetter = dependencies.statisticsGetter;
    this.#logger = dependencies.logger;
  }

  run: PostHandler<StatisticsGetterRequest, StatisticsGetterResponse> = async (req, res) => {
    const response = await this.#statisticsGetter.run(req.body);

    this.#logger.info(`Response: ${JSON.stringify(response)}`);

    res.status(STATUS_CODE.OK_200).json(response);
  };
}
