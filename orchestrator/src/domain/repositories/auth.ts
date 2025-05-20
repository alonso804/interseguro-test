import { Auth } from '../models/auth';
import { User } from '../models/user';

export type RegisterUserPayload = {
  name: User['name'];
  email: User['email'];
  password: Auth['password'];
};

export type LoginUserPayload = {
  email: User['email'];
  password: Auth['password'];
};

export interface AuthRepository {
  registerUser: (payload: RegisterUserPayload) => Promise<void>;

  loginUser: (payload: LoginUserPayload) => Promise<boolean>;
}
