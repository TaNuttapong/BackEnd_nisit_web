import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import accountController from "../controllers/AccountController";
import createAccountSchema from "../schemas/account/AccountCreate";
import listAccountSchema from "../schemas/account/AccountList";
import updateAccountSchema from "../schemas/account/AccountUpdate";
import deleteAccountSchema from "../schemas/account/AccountDelete";
import authController from "../controllers/Auth/AuthController";
import LoginSchema from "../schemas/auth/Login";
import LogoutSchema from "../schemas/auth/Logout";
import addProjectSchema from "../schemas/project/ProjectAdd";
import NiSitControllers from "../controllers/NisitController";
import ProjectControllers from "../controllers/ProjectController";
import addNiSitSchema from "../schemas/nisit/NisitAdd";
import multer from "fastify-multer";
import * as fs from "fs";
import pump from "pump";
import * as xlsx from "xlsx";
import { AddNiSitRequest } from "../models/Request/NisitRequestModel";
import { Readable } from "stream";
import { MultipartFile } from "@fastify/multipart";
async function streamToBuffer(stream: Readable): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

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
      handler: async function (req: FastifyRequest, reply: FastifyReply) {
        try {
          const dataExcel: MultipartFile = req.file as unknown as MultipartFile; // Type assertion to MultipartFile
          if (!dataExcel) {
            reply.code(400).send("No file uploaded");
            return;
          }

          const buffer = await streamToBuffer(dataExcel.file);
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

    fastify.post(`${prefix}/auth/login`, {
      schema: LoginSchema,
      handler: authController.login,
    });
  });
}
export default routes;
