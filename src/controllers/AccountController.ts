import { FastifyReply, FastifyRequest } from "fastify";
import * as bcrypt from "bcrypt";
import accountServices from "../services/AccountService";
import {
  AccountRequest,
  AccountUpdateRequest,
} from "../models/Request/AccountRequestModel";
import createResponseMessage from "../messages/response";
import { StatusCodeModel } from "../constants/StatusConstants";
import {
  AccountDescription,
  AccountService,
} from "../constants/AccountConstants";

async function listAccount(request: FastifyRequest, reply: FastifyReply) {
  try {
    const account = await accountServices.listAccount();

    const response = createResponseMessage({
      code: StatusCodeModel.SUCCESS.code,
      message: StatusCodeModel.SUCCESS.message,
      service: AccountService.LIST_ACCOUNT,
      description: AccountDescription.LIST_ACCOUNT_SUCCESS,
      data: account,
    });

    reply.status(200).send(response);
  } catch (err: any) {
    const response = createResponseMessage({
      code: StatusCodeModel.FAILED.code,
      message: StatusCodeModel.FAILED.message,
      service: AccountService.LIST_ACCOUNT,
      description: AccountDescription.LIST_ACCOUNT_FAILED,
      err: err.message,
    });
    reply.status(500).send(response);
  }
}

async function createAccount(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { email, password, name, branch } = request.body as AccountRequest;
    const hashedPassword = await bcrypt.hash(password, 10);

    const account = await accountServices.createAccount({
      email,
      password: hashedPassword,
      name,
      branch,
    });

    if (!account) {
      const response = createResponseMessage({
        code: StatusCodeModel.SUCCESS.code,
        message: StatusCodeModel.SUCCESS.message,
        service: AccountService.CREATE_ACCOUNT,
        description: AccountDescription.CREATE_ACCOUNT_FAILED,
        err: account,
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

async function updateAccount(request: FastifyRequest, reply: FastifyReply) {
  try {
    const params = request.params as { id?: string };
    const id = params?.id as string;

    const accountId: number = parseInt(id, 10);

    const { email, name, branch, role } = request.body as AccountUpdateRequest;

    const account = await accountServices.updateAccount(accountId, {
      email,
      name,
      branch,
      role,
    });

    const response = createResponseMessage({
      code: StatusCodeModel.SUCCESS.code,
      message: StatusCodeModel.SUCCESS.message,
      service: AccountService.UPDATE_ACCOUNT,
      description: AccountDescription.UPDATE_ACCOUNT_SUCCESS,
      data: account.updatedAt,
    });

    reply.status(200).send(response);
  } catch (err: any) {
    const response = createResponseMessage({
      code: StatusCodeModel.FAILED.code,
      message: StatusCodeModel.FAILED.message,
      service: AccountService.UPDATE_ACCOUNT,
      description: AccountDescription.UPDATE_ACCOUNT_FAILED,
      err: err.message,
    });
    reply.status(500).send(response);
  }
}

async function deleteAccount(request: FastifyRequest, reply: FastifyReply) {
  try {
    const params = request.params as { id?: string };
    const id = params?.id as string;

    const accountId: number = parseInt(id, 10);

    await accountServices.deleteAccount(accountId);

    const response = createResponseMessage({
      code: StatusCodeModel.SUCCESS.code,
      message: StatusCodeModel.SUCCESS.message,
      service: AccountService.DELETE_ACCOUNT,
      description: AccountDescription.DELETE_ACCOUNT_SUCCESS,
      data: true,
    });

    reply.status(200).send(response);
  } catch (err: any) {
    const response = createResponseMessage({
      code: StatusCodeModel.FAILED.code,
      message: StatusCodeModel.FAILED.message,
      service: AccountService.DELETE_ACCOUNT,
      description: AccountDescription.DELETE_ACCOUNT_FAILED,
      err: err.message,
    });
    reply.status(500).send(response);
  }
}

const accountController = {
  listAccount,
  createAccount,
  updateAccount,
  deleteAccount,
};

export default accountController;
