import { AccountRequest } from "../models/Request/AccountRequestModel";
import prisma from "../prisma";

async function listAccount() {
  return await prisma.account.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      branch: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function createAccount(payload: AccountRequest) {
  return await prisma.account.create({
    data: payload,
  });
}

async function getAccountByEmail(email: string) {
  return await prisma.account.findFirst({
    select: {
      id: true,
      name: true,
      email: true,
      branch: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      email: email,
    },
  });
}

const accountServices = {
  listAccount,
  createAccount,
  getAccountByEmail,
};

export default accountServices;
