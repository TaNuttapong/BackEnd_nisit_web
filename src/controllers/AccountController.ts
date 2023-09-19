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

async function createAccount(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { email, password } = request.body as AccountRequest;
    const hashedPassword = await bcrypt.hash(password, 10);

    const account = await accountServices.createAccount({
      email,
      password: hashedPassword,
    });

    if (!account) {
      const response = createResponseMessage({
        code: StatusCodeModel.SUCCESS.code,
        message: StatusCodeModel.SUCCESS.message,
        service: AccountService.CREATE_ACCOUNT,
        description: AccountDescription.CREATE_ACCOUNT_FAILED,
        data: account,
      });

      reply.status(403).send(response);
    }
    const findAccount = await accountServices.getAccountByEmail(email);

    if (!findAccount) {
      const response = createResponseMessage({
        code: StatusCodeModel.FAILED.code,
        message: StatusCodeModel.FAILED.message,
        service: AccountService.CREATE_ACCOUNT,
        description: AccountDescription.FIND_EMAIL_ACCOUNT_FAILED,
        err: findAccount,
      });
      reply.status(403).send(response);
    }

    const response = createResponseMessage({
      code: StatusCodeModel.SUCCESS.code,
      message: StatusCodeModel.SUCCESS.message,
      service: AccountService.CREATE_ACCOUNT,
      description: AccountDescription.CREATE_ACCOUNT_SUCCESS,
      data: account,
    });

    reply.status(201).send(response);
  } catch (err: any) {
    const response = createResponseMessage({
      code: StatusCodeModel.FAILED.code,
      message: StatusCodeModel.FAILED.message,
      service: AccountService.CREATE_ACCOUNT,
      description: AccountDescription.CREATE_ACCOUNT_FAILED,
      err: err.message,
    });
    reply.status(500).send(response);
  }
}

const accountController = {
  createAccount,
};

export default accountController;
