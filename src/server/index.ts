import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyPluginCallback,
} from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import helmet from "@fastify/helmet";
import jwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import routes from "../routes";
import swaggerConfig from "../config/swagger";
import config from "../config/config";
import NiSitControllers from "../controllers/NisitController";

async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.code(401).send({ error: "Unauthorized" });
  }
}

export default function createServer(): FastifyInstance {
  const app = fastify({ logger: true });

  if (typeof config.SECRET_KEY !== "string") {
    throw new Error("Invalid SECRET_KEY configuration");
  }

  if (typeof config.EXPIRE !== "string") {
    throw new Error("Invalid EXPIRE configuration");
  }

  app.register(multipart);
  app.register(cors, {
    origin: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
  });

  app.register(jwt, {
    secret: config.SECRET_KEY,
    sign: { algorithm: "HS512", expiresIn: config.EXPIRE },
  });

  app.decorate("authenticate", authenticate);

  app.register(helmet);
  app.register(swagger, swaggerConfig.swaggerOptions);
  app.register(swaggerUi, swaggerConfig.swaggerUiOptions);

  app.register((app, options, done) => {
    routes(app, "/apis");
    done();
  });

  return app;
}
