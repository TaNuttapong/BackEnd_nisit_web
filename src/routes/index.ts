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
import NiSitControllers, {
  streamToBuffer,
} from "../controllers/NisitController";
import ProjectControllers from "../controllers/ProjectController";
import addNiSitSchema from "../schemas/nisit/NisitAdd";
import multer from "fastify-multer";
import * as fs from "fs";
import pump from "pump";
import * as xlsx from "xlsx";
import { AddNiSitRequest } from "../models/Request/NisitRequestModel";

async function routes(fastify: FastifyInstance, prefix: string) {
  const upload = multer({ storage: multer.memoryStorage(), dest: "uploads/" });

  fastify.register(async function (instance) {
    instance.addHook("preHandler", async (request, reply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.code(401).send({ error: "Unauthorized" });
      }
    });
    instance.register(multer.contentParser);

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
      // schema: addNiSitSchema,
      // preHandler: handleFileUpload,
      // preHandler: upload.single("file"),
      // handler: NiSitControllers.addNiSitExcel,
      handler: async function (req, reply) {
        try {
          const data = req.file;
          const buffer = await streamToBuffer(data);
          const workbook = xlsx.read(buffer);
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const rows: AddNiSitRequest[] = xlsx.utils.sheet_to_json(sheet);
          console.log(`Total rows in the Excel: ${rows.length}`);

          reply.code(200).send("File uploaded and saved successfully");
        } catch (err) {
          console.error("Error:", err);
          reply.code(500).send("Internal Server Error");
        }
      },
    });
  });

  fastify.post(`${prefix}/auth/login`, {
    schema: LoginSchema,
    handler: authController.login,
  });
}

export default routes;
