import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodeModel } from "../constants/StatusConstants";
import createResponseMessage from "../messages/response";
import * as xlsx from "xlsx";
import nisitServices from "../services/NisitService";
import { NiSitDescription, NiSitService } from "../constants/NisitConstants";
import { Readable } from "stream";
import { AddNiSitRequest } from "../models/Request/NisitRequestModel";

async function addNiSitExcel(request: FastifyRequest, reply: FastifyReply) {
  try {
    const dataExcel = await request.file();
    if (!dataExcel) {
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

    const buffer = await streamToBuffer(dataExcel.file);
    const workbook = xlsx.read(buffer);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows: AddNiSitRequest[] = xlsx.utils.sheet_to_json(sheet);
    console.log(rows.length);

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

async function streamToBuffer(stream: Readable): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

const NiSitControllers = {
  addNiSitExcel,
};

export default NiSitControllers;
