import prisma from "../prisma";
import { LoginRequest } from "../models/Request/Auth/LoginRequestModel";

async function login(email: string) {
  return await prisma.account.findFirst({
    select: {
      id: true,
      email: true,
      password: true,
      role: true,
      name: true,
      branch: true,
    },
    where: {
      email: email,
    },
  });
}

async function verifyToken(params: type) {}

async function logout(params: type) {}

const AuthServices = {
  login,
  verifyToken,
  logout,
};

export default AuthServices;
