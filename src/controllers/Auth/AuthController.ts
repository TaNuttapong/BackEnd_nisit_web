import jwtPayload from "./../../models/jwt/jwtPayload";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import createResponseMessage from "../../messages/response";
import { StatusCodeModel } from "../../constants/StatusConstants";
import { LoginRequest } from "../../models/Request/Auth/LoginRequestModel";
import AuthServices from "../../services/AuthService";
import * as bcrypt from "bcrypt";
import { AuthConstants, AuthDescription } from "../../constants/AuthConstants";
import { sign } from "jsonwebtoken";
import config from "../../config/config";
import LoginResponse from "../../models/Response/LoginResponseModel";

async function login(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { email, password } = request.body as LoginRequest;

    const searchAccount = await AuthServices.login(email);

    if (!searchAccount) {
      const response = createResponseMessage({
        code: StatusCodeModel.NOT_FOUND.code,
        message: StatusCodeModel.NOT_FOUND.message,
        service: AuthConstants.LOGIN_ACCOUNT,
        description: AuthDescription.ACCOUNT_NOT_FOUND,
        err: searchAccount,
      });
      reply.status(400).send(response);
    } else {
      const passwordsMatch = await bcrypt.compare(
        password,
        searchAccount.password
      );
      if (passwordsMatch) {
        const oneDayInSeconds = 24 * 60 * 60;
        const expTimestamp = Math.floor(Date.now() / 1000) + oneDayInSeconds;

        const payloadToken: jwtPayload = {
          id: searchAccount.id,
          email: searchAccount.email,
          role: searchAccount.role,
          name: searchAccount.name,
          branch: searchAccount.branch,
          exp: expTimestamp,
        };

        const token = sign(payloadToken, config.SECRET_KEY ?? "", {
          algorithm: "HS512",
        });
        const payload: LoginResponse = {
          access_token: token,
          exp: expTimestamp,
          role: searchAccount.role,
        };
        const response = createResponseMessage({
          code: StatusCodeModel.SUCCESS.code,
          message: StatusCodeModel.SUCCESS.message,
          service: AuthConstants.LOGIN_ACCOUNT,
          description: AuthDescription.LOGIN_ACCOUNT_SUCCESS,
          data: payload,
        });

        reply.status(200).send(response);
      } else {
        const response = createResponseMessage({
          code: StatusCodeModel.INVALID.code,
          message: StatusCodeModel.INVALID.message,
          service: AuthConstants.LOGIN_ACCOUNT,
          description: AuthDescription.PASSWORD_INCORRECT,
        });
        reply.status(400).send(response);
      }
    }
  } catch (err: any) {
    const response = createResponseMessage({
      code: StatusCodeModel.FAILED.code,
      message: StatusCodeModel.FAILED.message,
      service: AuthConstants.LOGIN_ACCOUNT,
      description: AuthDescription.LOGIN_FAIL,
      err: err.message,
    });
    reply.status(500).send(response);
  }
}

async function logout(request: FastifyRequest, reply: FastifyReply) {
  try {
    const tokenString = request.headers.authorization as string;
    const token = tokenString.split(" ")[1];

    const verify = await AuthServices.logout(token);
    if (verify) {
      const response = createResponseMessage({
        code: StatusCodeModel.SUCCESS.code,
        message: StatusCodeModel.SUCCESS.message,
        service: AuthConstants.LOGOUT_ACCOUNT,
        description: AuthDescription.LOGOUT_FAIL,
        data: verify,
      });

      reply.status(200).send(response);
    } else {
      const response = createResponseMessage({
        code: StatusCodeModel.FAILED.code,
        message: StatusCodeModel.FAILED.message,
        service: AuthConstants.LOGOUT_ACCOUNT,
        description: AuthDescription.UNAUTHORIZED,
        err: verify,
      });
      reply.status(401).send(response);
    }
  } catch (err: any) {
    const response = createResponseMessage({
      code: StatusCodeModel.FAILED.code,
      message: StatusCodeModel.FAILED.message,
      service: AuthConstants.LOGIN_ACCOUNT,
      description: AuthDescription.LOGIN_FAIL,
      err: err.message,
    });
    reply.status(500).send(response);
  }
}

const authController = {
  login,
  logout,
};

export default authController;
