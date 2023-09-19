import { FastifyInstance } from "fastify";
import accountController from "../controllers/AccountController";

const routeSchemas = {
  createAccount: {
    tags: ["Account"],
    summary: "Create a new account",
    description: "Create a new user account.",
    // security: [{ Authorization: [] }],
    body: {
      type: "object",
      properties: {
        email: { type: "string" },
        password: { type: "string" },
      },
      examples: [
        {
          email: "example@email.com",
          password: "password123",
        },
      ],
      required: ["email", "password"],
    },

    response: {
      201: {
        description: "Account created successfully",
        properties: {
          status: {
            type: "object",
            properties: {
              code: { type: "string" },
              message: { type: "string" },
              service: { type: "string" },
              description: { type: "string" },
            },
          },
          data: { type: "object" },
        },
      },
      403: {
        description: "Failed to create account",
        properties: {
          status: {
            type: "object",
            properties: {
              code: { type: "string" },
              message: { type: "string" },
              service: { type: "string" },
              description: { type: "string" },
              error: { type: "string" },
            },
          },
        },
      },
      500: {
        description: "Internal Server Error",
        properties: {
          status: {
            type: "object",
            properties: {
              code: { type: "string" },
              message: { type: "string" },
              service: { type: "string" },
              description: { type: "string" },
              error: { type: "string" },
            },
          },
        },
      },
    },
  },
};

async function routes(fastify: FastifyInstance, prefix: string) {
  fastify.post(`${prefix}/account/add`, {
    schema: routeSchemas.createAccount,
    handler: accountController.createAccount,
  });
}

export default routes;
