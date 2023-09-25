import { FastifyInstance } from "fastify";
import accountController from "../controllers/AccountController";
import createAccountSchema from "../schemas/account/AccountCreate";
import listAccountSchema from "../schemas/account/AccountList";
import updateAccountSchema from "../schemas/account/AccountUpdate";
import deleteAccountSchema from "../schemas/account/AccountDelete";
import authController from "../controllers/Auth/AuthController";
import LoginSchema from "../schemas/auth/Login";
import LogoutSchema from "../schemas/auth/Logout";

async function routes(fastify: FastifyInstance, prefix: string) {
  fastify.get(`${prefix}/account/list`, {
    schema: listAccountSchema,
    handler: accountController.listAccount,
  });
  fastify.post(`${prefix}/account/add`, {
    schema: createAccountSchema,
    handler: accountController.createAccount,
  });
  fastify.post(`${prefix}/account/update/:id`, {
    schema: updateAccountSchema,
    handler: accountController.updateAccount,
  });
  fastify.delete(`${prefix}/account/delete/:id`, {
    schema: deleteAccountSchema,
    handler: accountController.deleteAccount,
  });
  fastify.post(`${prefix}/auth/login`, {
    schema: LoginSchema,
    handler: authController.login,
  });
  fastify.get(`${prefix}/auth/logout`, {
    schema: LogoutSchema,
    handler: authController.logout,
  });
}

export default routes;
