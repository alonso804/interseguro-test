import type { PostHandler } from 'src/helpers/types/express';
import { STATUS_CODE } from 'src/helpers/constants/http';
import z from 'zod';
import { LoggerFactory } from 'src/helpers/utils/logger/factory';
import { HttpCtrl } from 'src/helpers/types/business';
import {
  UserRegisterRequest,
  UserRegisterResponse,
  userRegisterSchema,
} from 'src/application/user-register/dto';
import { UserRegister } from 'src/application/user-register';

export const signUpSchema = z.object({
  body: userRegisterSchema,
});

export class SignUpController implements HttpCtrl {
  #userRegister: UserRegister;
  #logger: LoggerFactory;

  constructor(dependencies: { userRegister: UserRegister; logger: LoggerFactory }) {
    this.#userRegister = dependencies.userRegister;
    this.#logger = dependencies.logger;
  }

  run: PostHandler<UserRegisterRequest, UserRegisterResponse> = async (req, res) => {
    const response = await this.#userRegister.run(req.body);

    this.#logger.info(`Response: ${JSON.stringify(response)}`);

    res.status(STATUS_CODE.OK_200).json(response);
  };
}
