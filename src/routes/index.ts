import { FastifyInstance } from "fastify";
import accountController from "../controllers/AccountController";
import createAccountSchema from "../schemas/account/AccountCreate";
import listAccountSchema from "../schemas/account/AccountList";
import updateAccountSchema from "../schemas/account/AccountUpdate";
import deleteAccountSchema from "../schemas/account/AccountDelete";
import authController from "../controllers/Auth/AuthController";
import LoginSchema from "../schemas/auth/Login";
import LogoutSchema from "../schemas/auth/Logout";
import jwtMiddleware from "../middleware/jwt.middleware";
import addController from "../controllers/ProjectController";
import addProjectSchema from "../schemas/project/ProjectAdd";

async function routes(fastify: FastifyInstance, prefix: string) {
  fastify.get(`${prefix}/account/list`, {
    schema: listAccountSchema,
    preHandler: jwtMiddleware,
    handler: accountController.listAccount,
  });
  fastify.post(`${prefix}/account/add`, {
    schema: createAccountSchema,
    preHandler: jwtMiddleware,
    handler: accountController.createAccount,
  });
  fastify.post(`${prefix}/account/update/:id`, {
    schema: updateAccountSchema,
    preHandler: jwtMiddleware,
    handler: accountController.updateAccount,
  });
  fastify.delete(`${prefix}/account/delete/:id`, {
    schema: deleteAccountSchema,
    preHandler: jwtMiddleware,
    handler: accountController.deleteAccount,
  });
  fastify.post(`${prefix}/auth/login`, {
    schema: LoginSchema,
    handler: authController.login,
  });
  fastify.get(`${prefix}/auth/logout`, {
    schema: LogoutSchema,
    preHandler: jwtMiddleware,
    handler: authController.logout,
  });
  fastify.post(`${prefix}/project/add`, {
    schema: addProjectSchema,
    preHandler: jwtMiddleware,
    handler: addController.addProject,
  });
}

export default routes;
