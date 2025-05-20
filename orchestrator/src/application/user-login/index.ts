import { AuthRepository } from 'src/domain/repositories/auth';
import { UserLoginRequest, UserLoginResponse } from './dto';
import { InvalidUserError } from 'src/errors/http/invalid-user';
import { createToken } from 'src/helpers/utils/jwt';

export class UserLogin {
  #authRepository: AuthRepository;

  constructor(dependencies: { authRepository: AuthRepository }) {
    this.#authRepository = dependencies.authRepository;
  }

  async run(payload: UserLoginRequest): Promise<UserLoginResponse> {
    const response = await this.#authRepository.loginUser(payload);

    if (!response) {
      throw new InvalidUserError(payload.email);
    }

    const token = createToken({ email: payload.email });

    return {
      email: payload.email,
      token,
    };
  }
}
