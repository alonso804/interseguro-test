import type { PostHandler } from 'src/helpers/types/express';
import { STATUS_CODE } from 'src/helpers/constants/http';
import z from 'zod';
import { LoggerFactory } from 'src/helpers/utils/logger/factory';
import { HttpCtrl } from 'src/helpers/types/business';
import {
  userLoginSchema,
  UserLoginRequest,
  UserLoginResponse,
} from 'src/application/user-login/dto';
import { UserLogin } from 'src/application/user-login';

export const loginSchema = z.object({
  body: userLoginSchema,
});

export class LoginController implements HttpCtrl {
  #userLogin: UserLogin;
  #logger: LoggerFactory;

  constructor(dependencies: { userLogin: UserLogin; logger: LoggerFactory }) {
    this.#userLogin = dependencies.userLogin;
    this.#logger = dependencies.logger;
  }

  run: PostHandler<UserLoginRequest, UserLoginResponse> = async (req, res) => {
    const response = await this.#userLogin.run(req.body);

    this.#logger.info(`Response: ${JSON.stringify(response)}`);

    res.status(STATUS_CODE.OK_200).json(response);
  };
}
