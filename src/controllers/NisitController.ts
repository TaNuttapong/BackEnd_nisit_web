import { FastifyReply, FastifyRequest } from "fastify";
import * as xlsx from "xlsx";
import { StatusCodeModel } from "../constants/StatusConstants";
import createResponseMessage from "../messages/response";
import nisitServices from "../services/NisitService";
import { NiSitDescription, NiSitService } from "../constants/NisitConstants";
import { AddNiSitRequest } from "../models/Request/NisitRequestModel";

async function addNiSitExcel(request: FastifyRequest, reply: FastifyReply) {
  try {
    const data = await request.file();
    const file = data?.file;

    if (!file) {
      const response = createResponseMessage({
        code: StatusCodeModel.FAILED.code,
        message: StatusCodeModel.FAILED.message,
        service: NiSitService.ADD_NISIT,
        description: NiSitDescription.ADD_NISIT_FAILED,
        err: "No file uploaded",
      });

      reply.status(400).send(response);
      return;
    }

    const buffer = await data?.toBuffer();
    const workbook = xlsx.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows: AddNiSitRequest[] = xlsx.utils.sheet_to_json(sheet);

    for (const row of rows) {
      await nisitServices.addNiSit(row);
    }

    const response = createResponseMessage({
      code: StatusCodeModel.SUCCESS.code,
      message: StatusCodeModel.SUCCESS.message,
      service: NiSitService.ADD_NISIT,
      description: NiSitDescription.ADD_NISIT_SUCCESS,
      data: true,
    });

    reply.status(201).send(response);
  } catch (err: any) {
    const response = createResponseMessage({
      code: StatusCodeModel.FAILED.code,
      message: StatusCodeModel.FAILED.message,
      service: NiSitService.ADD_NISIT,
      description: NiSitDescription.ADD_NISIT_FAILED,
      err: err.message,
    });

    reply.status(500).send(response);
  }
}
async function addNiSit(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, classStudent, student_id } = request.body as AddNiSitRequest;

    const addNisit = await nisitServices.addNiSit({
      student_id,
      name,
      classStudent,
    });
    console.log(addNisit);

    const response = createResponseMessage({
      code: StatusCodeModel.SUCCESS.code,
      message: StatusCodeModel.SUCCESS.message,
      service: NiSitService.ADD_NISIT,
      description: NiSitDescription.ADD_NISIT_SUCCESS,
      data: addNiSit,
    });

    reply.status(201).send(response);
  } catch (err: any) {
    const response = createResponseMessage({
      code: StatusCodeModel.FAILED.code,
      message: StatusCodeModel.FAILED.message,
      service: NiSitService.ADD_NISIT,
      description: NiSitDescription.ADD_NISIT_FAILED,
      err: err.message,
    });
    reply.status(500).send(response);
  }
}

const NiSitControllers = {
  addNiSitExcel,
  addNiSit,
};

export default NiSitControllers;
