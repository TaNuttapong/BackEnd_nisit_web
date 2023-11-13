import { AddNiSitRequest } from "../models/Request/NisitRequestModel";
import prisma from "../prisma";
import { convertStringToArray } from "../utils/utils";

async function findNisitWithStudentId(studentId: string) {
  const nisit = await prisma.nisit.findMany({
    where: {
      student_id: studentId,
    },
    take: 1,
  });
  return nisit;
}

async function addNiSit(payload: AddNiSitRequest, project_id: string) {
  const studentId = String(payload.student_id);
  const name = payload.name;
  const classPayload = payload.classStudent ?? "";

  const nisit = await findNisitWithStudentId(studentId);
  if (nisit.length > 0) {
    const projectIdToArray = convertStringToArray(nisit[0].project_id);
    const checkProjectId = projectIdToArray.includes(project_id);

    if (checkProjectId) {
      return;
    }

    projectIdToArray.push(project_id);
    const projectIdToString = projectIdToArray.join(",");

    return await prisma.nisit.update({
      where: {
        student_id: studentId,
      },
      data: {
        project_id: projectIdToString,
      },
    });
  } else {
    return await prisma.nisit.create({
      data: {
        student_id: studentId,
        name: name,
        classStudent: classPayload,
        project_id: project_id,
      },
    });
  }
}

const nisitServices = {
  addNiSit,
};

export default nisitServices;
