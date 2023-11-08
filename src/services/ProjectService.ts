import { AddProjectRequest } from "../models/Request/ProjectRequestModel";
import prisma from "../prisma";

async function listProject() {
  return await prisma.project.findMany({
    select: {
      id: true,
      project_name: true,
      description: true,
      image: true,
      start_date: true,
      end_date: true,
      createdAt: true,
      updatedAt: true,
      account_id: true,
      link: true,
    },
  });
}

async function addProject(payload: AddProjectRequest) {
  return await prisma.project.create({
    data: payload,
  });
}

const ProjectServices = {
  addProject,
  listProject,
};

export default ProjectServices;
