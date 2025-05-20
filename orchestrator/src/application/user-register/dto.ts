import z from 'zod';

export const userRegisterSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  password: z.string().min(8).max(20),
});

export type UserRegisterRequest = z.infer<typeof userRegisterSchema>;

export type UserRegisterResponse = {
  email: string;
  token: string;
};
