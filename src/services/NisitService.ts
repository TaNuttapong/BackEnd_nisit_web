import { AddNiSitRequest } from "../models/Request/NisitRequestModel";
import prisma from "../prisma";

async function addNiSit(payload: AddNiSitRequest) {
  const studentId = String(payload.student_id);
  const name = payload.name;
  const classPayload = payload.class ?? "";

  return await prisma.nisit.create({
    data: {
      student_id: studentId,
      name: name,
      class: classPayload,
    },
  });
}

const nisitServices = {
  addNiSit,
};

export default nisitServices;
