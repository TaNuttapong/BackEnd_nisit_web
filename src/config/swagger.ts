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
    tags: [{ name: "Account", description: "Account" }],
    // components: {
    //   securitySchemes: {
    //     bearerAuth: {
    //       type: "http",
    //       scheme: "bearer",
    //     },
    //   },
    // },
    // securityDefinitions: {
    //   Authorization: {
    //     description: 'Authorization header token, sample: "Bearer #TOKEN#"',
    //     type: "apiKey",
    //     name: "Authorization",
    //     in: "header",
    //   },
    // },
  },
};

const swaggerUiOptions = {
  routePrefix: "/documentation",
  // transformStaticCSP: (header: any) => header,
  exposeRoute: true,
};

const swaggerConfig = {
  swaggerOptions,
  swaggerUiOptions,
};

export default swaggerConfig;
