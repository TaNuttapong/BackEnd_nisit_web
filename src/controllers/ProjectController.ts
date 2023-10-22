import { FastifyReply, FastifyRequest } from "fastify";
import { AddProjectRequest } from "../models/Request/AddRequestModel";
import addServices from "../services/AddAdminService";
import { StatusCodeModel } from "../constants/StatusConstants";
import createResponseMessage from "../messages/response";
import {
  ProjectDescription,
  ProjectService,
} from "../constants/ProjectConstants";

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

    // Convert start_date to ISO-8601 DateTime format if it's not in that format
    const isoStartDate = new Date(start_date).toISOString();
    const isoEndDate = new Date(end_date).toISOString();
    
    const addProject = await addServices.addProject({
      project_name,
      description,
      image,
      start_date: isoStartDate, // Use the converted date
      end_date: isoEndDate,
      link,
      account_id,
    });

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

const addController = {
  addProject,
};

export default addController;
