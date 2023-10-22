import { AddProjectRequest } from "../models/Request/AddRequestModel";
import prisma from "../prisma";

async function addProject(payload: AddProjectRequest) {
  return await prisma.project.create({
    data: payload,
  });
}

const addServices = {
  addProject,
};

export default addServices;
