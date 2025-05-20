import { AuthRepository } from 'src/domain/repositories/auth';
import { UserRegisterRequest, UserRegisterResponse } from './dto';
import { createToken } from 'src/helpers/utils/jwt';

export class UserRegister {
  #authRepository: AuthRepository;

  constructor(dependencies: { authRepository: AuthRepository }) {
    this.#authRepository = dependencies.authRepository;
  }

  async run(payload: UserRegisterRequest): Promise<UserRegisterResponse> {
    await this.#authRepository.registerUser(payload);

    const token = createToken({ email: payload.email });

    return {
      email: payload.email,
      token,
    };
  }
}
