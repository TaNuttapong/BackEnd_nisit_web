import { FastifyInstance } from "fastify";
import accountController from "../controllers/AccountController";
import createAccountSchema from "../schemas/account/AccountCreate";

async function routes(fastify: FastifyInstance, prefix: string) {
  fastify.post(`${prefix}/account/add`, {
    schema: createAccountSchema,
    handler: accountController.createAccount,
  });
}

export default routes;
