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
    ],

    consumes: ["application/json"],
    produces: ["application/json"],
  },
};

const swaggerUiOptions = {
  routePrefix: "/documentation",
  exposeRoute: true,
  uiConfig: {
    filter: true,
  },
};

const swaggerConfig = {
  swaggerOptions,
  swaggerUiOptions,
};

export default swaggerConfig;
