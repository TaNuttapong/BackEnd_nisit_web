import { FastifyReply, FastifyRequest } from "fastify";
import * as bcrypt from "bcrypt";
import accountServices from "../services/AccountService";
import { AccountRequest } from "../models/Request/AccountRequestModel";
import createResponseMessage from "../messages/response";
import { StatusCodeModel } from "../constants/StatusConstants";
import {
  AccountDescription,
  AccountService,
} from "../constants/AccountConstants";
import { RoleEnum } from "../enums/role.enum";

async function createAccount(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { email, password } = request.body as AccountRequest;

    const hashedPassword = await bcrypt.hash(password, 10);

    const account = await accountServices.createAccount({
      email,
      password: hashedPassword,
    });

    if (account) {
      const response = createResponseMessage({
        code: StatusCodeModel.SUCCESS.code,
        message: StatusCodeModel.SUCCESS.message,
        service: AccountService.CREATE_ACCOUNT,
        description: AccountDescription.CREATE_ACCOUNT,
        data: account,
      });
      reply.status(201).send(response);
    } else {
      const response = createResponseMessage({
        code: StatusCodeModel.FAILED.code,
        message: StatusCodeModel.FAILED.message,
        service: AccountService.CREATE_ACCOUNT,
        description: AccountDescription.CREATE_ACCOUNT,
        err: account,
      });
      reply.status(403).send(response);
    }
  } catch (err: any) {
    const response = createResponseMessage({
      code: StatusCodeModel.FAILED.code,
      message: StatusCodeModel.FAILED.message,
      service: AccountService.CREATE_ACCOUNT,
      description: AccountDescription.CREATE_ACCOUNT,
      err: err.message,
    });
    reply.status(500).send(response);
  }
}

const accountController = {
  createAccount,
};

export default accountController;
