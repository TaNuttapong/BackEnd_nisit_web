import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import config from "../config/config";
import jwt, { FastifyJWTOptions } from "@fastify/jwt";

const pluginNiSit: FastifyPluginCallback = async (fastify, opts, next) => {
  if (!config.SECRET_KEY) {
    throw new Error("Missing SECRET_KEY in the configuration");
  }

  const jwtOptions: FastifyJWTOptions = {
    secret: config.SECRET_KEY,
    sign: { algorithm: "HS512", expiresIn: config.EXPIRE },
  };

  fastify.register(jwt, jwtOptions);

  fastify.decorate(
    "authenticate",
    function (request: FastifyRequest, reply: FastifyReply) {
      try {
        request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );

  next();
};

export default pluginNiSit;
