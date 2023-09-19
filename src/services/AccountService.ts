import { AccountRequest } from "../models/Request/AccountRequestModel";
import prisma from "../prisma";

async function createAccount(payload: AccountRequest) {
  return await prisma.account.create({
    data: payload,
  });
}

async function getAccountByEmail(email: string) {
  return await prisma.account.findFirst({
    select: {
      id: true,
      email: true,
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
  createAccount,
  getAccountByEmail,
};

export default accountServices;
