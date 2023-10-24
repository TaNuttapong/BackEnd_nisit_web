import { AddProjectRequest } from "../models/Request/ProjectRequestModel";
import prisma from "../prisma";

async function addProject(payload: AddProjectRequest) {
  return await prisma.project.create({
    data: payload,
  });
}

const ProjectServices = {
  addProject,
};

export default ProjectServices;
