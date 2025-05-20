import z from 'zod';

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export type UserLoginRequest = z.infer<typeof userLoginSchema>;

export type UserLoginResponse = {
  email: string;
  token: string;
};
