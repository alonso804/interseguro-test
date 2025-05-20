import z from 'zod';

const matrixSchema = z.array(z.array(z.number()));
const rectangularMatrixSchema = matrixSchema
  .refine((val) => val.length > 0, {
    message: 'Matrix must not be empty',
  })
  .refine((val) => val.every((row) => row.length > 0), {
    message: 'Matrix rows must not be empty',
  })
  .refine((val) => val.every((row) => row.length === val[0].length), {
    message: 'Matrix must be rectangular',
  });

export const statisticsGetterSchema = z.object({
  matrix: rectangularMatrixSchema,
  Q: matrixSchema,
  R: matrixSchema,
});

export type StatisticsGetterRequest = z.infer<typeof statisticsGetterSchema>;

export type StatisticsGetterResponse = {
  max: number;
  min: number;
  average: number;
  sum: number;
  isDiagonal: boolean;
};
