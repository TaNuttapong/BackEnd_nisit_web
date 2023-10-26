import fastify, { FastifyReply, FastifyRequest } from "fastify";
import * as jwt from "jsonwebtoken";
import createResponseMessage from "../messages/response";
import { StatusCodeModel } from "../constants/StatusConstants";
import { AuthConstants, AuthDescription } from "../constants/AuthConstants";
import config from "../config/config";

const jwtMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply,
  done: () => void
) => {
  const tokenString = request.headers.authorization as string;
  const token = tokenString.split(" ")[1];

  if (!token) {
    const response = createResponseMessage({
      code: StatusCodeModel.FAILED.code,
      message: StatusCodeModel.FAILED.message,
      service: AuthConstants.MIDDLEWARE,
      description: AuthDescription.UNAUTHORIZED,
      err: "Unauthorized",
    });
    reply.status(401).send(response);
  } else {
    const decoded = jwt.verify(token, config.SECRET_KEY || "");

    if (!decoded) {
      const response = createResponseMessage({
        code: StatusCodeModel.INVALID.code,
        message: StatusCodeModel.INVALID.message,
        service: AuthConstants.MIDDLEWARE,
        description: AuthDescription.TOKEN_INCORRECT,
        err: token,
      });
      reply.status(400).send(response);
    }
    done();
  }
};
export default jwtMiddleware;
