import { FastifyInstance } from "fastify";
import accountController from "../controllers/AccountController";
import createAccountSchema from "../schemas/account/AccountCreate";
import listAccountSchema from "../schemas/account/AccountList";
import updateAccountSchema from "../schemas/account/AccountUpdate";
import deleteAccountSchema from "../schemas/account/AccountDelete";
import authController from "../controllers/Auth/AuthController";
import LoginSchema from "../schemas/auth/Login";
import LogoutSchema from "../schemas/auth/Logout";
import addProjectSchema from "../schemas/project/ProjectAdd";
import ProjectControllers from "../controllers/ProjectController";
import addNiSitSchema from "../schemas/nisit/NisitAdd";
import NiSitControllers from "../controllers/NisitController";

async function routes(fastify: FastifyInstance, prefix: string) {
  fastify.register(async function (instance) {
    instance.addHook("preHandler", async (req, reply) => {
      try {
        await req.jwtVerify();
      } catch (err) {
        reply.code(401).send({ error: "Unauthorized" });
      }
    });

    instance.get(`${prefix}/auth/logout`, {
      schema: LogoutSchema,
      handler: authController.logout,
    });
    instance.get(`${prefix}/account/list`, {
      schema: listAccountSchema,
      handler: accountController.listAccount,
    });
    instance.post(`${prefix}/account/add`, {
      schema: createAccountSchema,
      handler: accountController.createAccount,
    });
    instance.post(`${prefix}/account/update/:id`, {
      schema: updateAccountSchema,
      handler: accountController.updateAccount,
    });
    instance.delete(`${prefix}/account/delete/:id`, {
      schema: deleteAccountSchema,
      handler: accountController.deleteAccount,
    });
    instance.post(`${prefix}/project/add`, {
      schema: addProjectSchema,
      handler: ProjectControllers.addProject,
    });

    instance.post(`${prefix}/nisit/excel/add`, {
      schema: addNiSitSchema,
      handler: NiSitControllers.addNiSitExcel,
    });
  });

  fastify.post(`${prefix}/auth/login`, {
    schema: LoginSchema,
    handler: authController.login,
  });
}

export default routes;
