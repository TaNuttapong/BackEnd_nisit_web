import fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import routes from "../routes";
import swaggerConfig from "../config/swagger";

function server() {
  const app = fastify({ logger: true });

  app.register(cors, {
    origin: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
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
