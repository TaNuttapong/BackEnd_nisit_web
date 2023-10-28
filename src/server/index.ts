import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import helmet from "@fastify/helmet";
import jwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import swaggerConfig from "../config/swagger";
import config from "../config/config";
import routes from "../routes";

export default function createServer(): FastifyInstance {
  const app = fastify({ logger: true });

  app.register(cors, {
    origin: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
  });
  app.register(fastifyMultipart, {
    attachFieldsToBody: true,
    // limits: {
    //   fields: 1,
    //   files: 1,
    // },
  });
  app.register(jwt, {
    secret: config.SECRET_KEY ?? "",
    sign: { algorithm: "HS512", expiresIn: config.EXPIRE },
  });

  app.register(helmet);
  app.register(swagger, swaggerConfig.swaggerOptions);
  app.register(swaggerUi, swaggerConfig.swaggerUiOptions);

  app.register((app, options, done) => {
    routes(app, "/apis");
    done();
  });

  return app;
}
