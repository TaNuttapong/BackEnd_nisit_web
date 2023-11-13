import { AddCertificateRequest } from "../models/Request/CertificateRequestModel";
import prisma from "../prisma";
import { convertStringToArray } from "../utils/utils";

async function findNisitWithStudentId(studentId: string) {
  const nisitProject = await prisma.nisit_Project.findMany({
    where: {
      student_number: studentId,
    },
    take: 1,
  });

  return nisitProject;
}

async function addCertificate(
  payload: AddCertificateRequest,
  project_id: string
) {
  const studentId = String(payload.student_number);
  const certificate = payload.certificate;

  const nisitProject = await findNisitWithStudentId(studentId);

  if (nisitProject.length > 0) {
    const certificateToArray = convertStringToArray(
      nisitProject[0].certificate
    );
    const checkCertificate = certificateToArray.includes(certificate);

    if (checkCertificate) {
      return; // Certificate already exists, no need to update
    }

    certificateToArray.push(certificate);
    const updatedCertificates = certificateToArray.join(",");

    await prisma.nisit_Project.update({
      where: {
        id: nisitProject[0].id,
      },
      data: {
        certificate: updatedCertificates,
      },
    });
  } else {
    await prisma.nisit_Project.create({
      data: {
        student_number: studentId,
        certificate: certificate,
      },
    });
  }
}

const certificateServices = {
  addCertificate,
};

export default certificateServices;
