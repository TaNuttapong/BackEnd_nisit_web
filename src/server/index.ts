import fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import jwt from "@fastify/jwt";
import routes from "../routes";
import swaggerConfig from "../config/swagger";
import config from "../config/config";

function server() {
  const app = fastify({ logger: true });
  if (typeof config.SECRET_KEY !== "string") {
    throw new Error("Invalid SECRET_KEY configuration");
  }
  if (typeof config.EXPIRE !== "string") {
    throw new Error("Invalid EXPIRE configuration");
  }
  app.register(cors, {
    origin: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
  });
  app.register(jwt, {
    secret: config.SECRET_KEY,
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

export default server;
