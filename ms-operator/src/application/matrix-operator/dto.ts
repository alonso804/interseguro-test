import { Matrix } from 'src/domain/models/matrix';
import { QRDecomposition } from 'src/domain/repositories/matrix';
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

export const matrixOperatorSchema = z.object({
  matrix: rectangularMatrixSchema,
  rotateTimes: z.number().int().default(1),
});

export type MatrixOperatorRequest = z.infer<typeof matrixOperatorSchema>;

export type MatrixOperatorResponse = {
  rotatedMatrix: Matrix;
  qrDecomposition: QRDecomposition;
};
