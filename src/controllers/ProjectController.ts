import { FastifyReply, FastifyRequest } from "fastify";
import { AddProjectRequest } from "../models/Request/ProjectRequestModel";
import addServices from "../services/ProjectService";
import { StatusCodeModel } from "../constants/StatusConstants";
import createResponseMessage from "../messages/response";
import {
  ProjectDescription,
  ProjectService,
} from "../constants/ProjectConstants";
import ProjectServices from "../services/ProjectService";
import path from "path";
import * as fs from "fs";

async function listProject(request: FastifyRequest, reply: FastifyReply) {
  try {
    const Project = await ProjectServices.listProject();

    const response = createResponseMessage({
      code: StatusCodeModel.SUCCESS.code,
      message: StatusCodeModel.SUCCESS.message,
      service: ProjectService.LIST_PROJECT,
      description: ProjectDescription.LIST_PROJECT_SUCCESS,
      data: Project,
    });

    reply.status(200).send(response);
  } catch (err: any) {
    const response = createResponseMessage({
      code: StatusCodeModel.FAILED.code,
      message: StatusCodeModel.FAILED.message,
      service: ProjectService.LIST_PROJECT,
      description: ProjectDescription.LIST_PROJECT_FAILED,
      err: err.message,
    });
    reply.status(500).send(response);
  }
}
async function addProject(request: FastifyRequest, reply: FastifyReply) {
  try {
    const {
      project_name,
      description,
      image,
      start_date,
      end_date,
      link,
      account_id,
    } = request.body as AddProjectRequest;

    const isoStartDate = new Date(start_date).toISOString();
    const isoEndDate = new Date(end_date).toISOString();

    const addProject = await addServices.addProject({
      project_name,
      description,
      image,
      start_date: isoStartDate,
      end_date: isoEndDate,
      link,
      account_id,
    });
    console.log(addProject);

    const response = createResponseMessage({
      code: StatusCodeModel.SUCCESS.code,
      message: StatusCodeModel.SUCCESS.message,
      service: ProjectService.ADD_PROJECT,
      description: ProjectDescription.ADD_PROJECT_SUCCESS,
      data: addProject,
    });

    reply.status(201).send(response);
  } catch (err: any) {
    const response = createResponseMessage({
      code: StatusCodeModel.FAILED.code,
      message: StatusCodeModel.FAILED.message,
      service: ProjectService.ADD_PROJECT,
      description: ProjectDescription.ADD_PROJECT_FAILED,
      err: err.message,
    });
    reply.status(500).send(response);
  }
}

const ProjectControllers = {
  addProject,
  listProject,
};

export default ProjectControllers;
