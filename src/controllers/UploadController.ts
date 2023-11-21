import { FastifyReply, FastifyRequest } from "fastify";
import createResponseMessage from "../messages/response";
import { StatusCodeModel } from "../constants/StatusConstants";
import {
  UploadImageDescription,
  UploadImageServices,
} from "../constants/UploadConstants";
import UploadServices from "../services/UploadService";
import UploadInterface from "../interfaces/UploadInterface";

async function uploadImage(request: FastifyRequest, reply: FastifyReply) {
  try {
    const file = await request.file();
    console.log(file);
    if (!file) {
      const response = createResponseMessage({
        code: StatusCodeModel.FAILED.code,
        message: StatusCodeModel.FAILED.message,
        service: UploadImageServices.UPLOAD_IMAGE,
        description: UploadImageDescription.UPLOAD_IMAGE_FAILED,
        err: "No file uploaded",
      });

      reply.status(400).send(response);
      return;
    }

    const chunks: Buffer[] = [];
    let fileSize = 0;

    file.file.on("data", (chunk) => {
      chunks.push(chunk);
      fileSize += chunk.length;
    });

    file.file.on("end", async () => {
      const fileData: UploadInterface = {
        originalname: file.filename || "",
        mimetype: file.mimetype || "",
        buffer: Buffer.concat(chunks, fileSize),
        size: fileSize,
      };

      try {
        const publicUrl = await UploadServices.uploadImg(fileData);
        console.log("File uploaded successfully:", publicUrl);
        reply.status(200).send({ url: publicUrl });
      } catch (err) {
        console.error("Error uploading file:", err);
        reply.status(500).send({ error: "Internal Server Error" });
      }
    });
  } catch (err: any) {
    const response = createResponseMessage({
      code: StatusCodeModel.FAILED.code,
      message: StatusCodeModel.FAILED.message,
      service: UploadImageServices.UPLOAD_IMAGE,
      description: UploadImageDescription.UPLOAD_IMAGE_FAILED,
      err: err.message,
    });

    reply.status(500).send(response);
  }
}

const UploadControllers = {
  uploadImage,
};
export default UploadControllers;
