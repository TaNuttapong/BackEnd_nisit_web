import { FastifyInstance } from "fastify";
import accountController from "../controllers/AccountServices";

async function routes(fastify: FastifyInstance, prefix: string) {
  fastify.post(`${prefix}/account/add`, {
    handler: accountController.createAccount,
  });
}
export default routes;
