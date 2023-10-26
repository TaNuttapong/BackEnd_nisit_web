const swaggerOptions = {
  openapi: {
    info: {
      title: "Fastify REST API",
      description: "API documentation",
      version: "0.1.0",
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Development server",
      },
    ],
    tags: [
      { name: "Auth", description: "Auth" },
      { name: "Account", description: "Account" },
      { name: "Project", description: "Project" },
      { name: "NiSit", description: "NiSit" },
    ],
    consumes: ["application/json"],
    produces: ["application/json"],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          name: "bearerAuth",
          in: "header",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
};

const swaggerUiOptions = {
  routePrefix: "/documentation",
  exposeRoute: true,
  uiConfig: {
    filter: true,
    persistAuthorization: true,
  },
};

const swaggerConfig = {
  swaggerOptions,
  swaggerUiOptions,
};

export default swaggerConfig;
