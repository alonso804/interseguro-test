import { Client, LibsqlError } from '@libsql/client';
import {
  AuthRepository,
  LoginUserPayload,
  RegisterUserPayload,
} from 'src/domain/repositories/auth';
import { SQLError } from 'src/errors/http/sql';
import { STATUS_CODE } from 'src/helpers/constants/http';
import { LoggerFactory } from 'src/helpers/utils/logger/factory';
import bcrypt from 'bcrypt';
import { TABLE } from 'src/db/libsql/helpers';

const SALT_ROUNDS = 10;

export class LibSQLAuthRepository implements AuthRepository {
  #client: Client;
  #logger: LoggerFactory;

  constructor(dependencies: { libSQLClient: Client; logger: LoggerFactory }) {
    this.#client = dependencies.libSQLClient;
    this.#logger = dependencies.logger;
  }

  async registerUser(payload: RegisterUserPayload): Promise<void> {
    try {
      const hashedPassword = await bcrypt.hash(payload.password, SALT_ROUNDS);

      const userResult = await this.#client.execute(
        `INSERT INTO ${TABLE.USERS} (email, name) VALUES (?, ?)`,
        [payload.email, payload.name],
      );

      if (userResult.rowsAffected === 0) {
        throw new SQLError(
          STATUS_CODE.BAD_REQUEST_400,
          `Failed to register user <${payload.email}>`,
        );
      }

      this.#logger.info(`User result: ${JSON.stringify(userResult)}`);

      const authResult = await this.#client.execute(
        `INSERT INTO ${TABLE.AUTH} (user_id, password) VALUES (?, ?)`,
        [userResult.lastInsertRowid as bigint, hashedPassword],
      );

      if (authResult.rowsAffected === 0) {
        throw new SQLError(
          STATUS_CODE.BAD_REQUEST_400,
          `Failed to register user <${payload.email}>`,
        );
      }

      this.#logger.info(`Auth result: ${JSON.stringify(authResult)}`);
    } catch (error) {
      if (error instanceof LibsqlError) {
        throw new SQLError(
          STATUS_CODE.INTERNAL_SERVER_ERROR_500,
          `Failed to register user <${payload.email}>`,
        );
      }

      throw error;
    }
  }

  async loginUser(payload: LoginUserPayload): Promise<boolean> {
    try {
      // console.log(payload);
      // const query = `
      //     SELECT a.password,
      //     FROM ${TABLE.USERS} u
      //     JOIN ${TABLE.AUTH} a ON u.id = a.user_id
      //     WHERE u.email = ?
      //   `;
      // console.log(query);
      const result = await this.#client.execute(
        `
          SELECT a.password
          FROM ${TABLE.USERS} AS u
          JOIN ${TABLE.AUTH} AS a ON u.id = a.user_id
          WHERE u.email = :email
        `,
        {
          email: payload.email,
        },
      );

      if (result.rows.length === 0) {
        return false;
      }

      const { password } = result.rows[0] as unknown as { password: string };

      const isPasswordValid = await bcrypt.compare(payload.password, password);

      if (!isPasswordValid) {
        return false;
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        this.#logger.error(`Error: ${JSON.stringify(error.message)}`);
      }

      return false;
    }
  }
}
