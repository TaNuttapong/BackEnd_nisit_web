import { FastifyInstance } from "fastify";
import accountController from "../controllers/AccountServices";

async function routes(fastify: FastifyInstance, prefix: string) {
  fastify.post(`${prefix}/account/add`, {
    schema: {
      tags: ["Account"],
      summary: "Create a new account",
      description: "Create a new user account.",
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
      },
      response: {
        201: {
          description: "Account created successfully",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: accountController.createAccount,
  });
}
export default routes;
