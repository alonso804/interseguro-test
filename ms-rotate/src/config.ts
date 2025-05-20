import { z } from 'zod';
import { logger } from './logger';

if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test') {
  process.loadEnvFile('.env.local');
}

const envVariablesSchema = z.object({
  PORT: z.string().regex(/^\d+$/).default('3000'),
});

const parsedEnvVariables = envVariablesSchema.safeParse(process.env);

if (!parsedEnvVariables.success) {
  logger.error(parsedEnvVariables.error.errors);

  throw new Error('Invalid environment variables');
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends z.infer<typeof envVariablesSchema> {}
  }
}

export const CONFIG = parsedEnvVariables.data;
