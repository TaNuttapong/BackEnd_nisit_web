const swaggerOptions = {
  swagger: {
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
    tags: [{ name: "Account", description: "Account" }],
  },
};

const swaggerUiOptions = {
  routePrefix: "/documentation",
  exposeRoute: true,
};

const swaggerConfig = {
  swaggerOptions,
  swaggerUiOptions,
};

export default swaggerConfig;
