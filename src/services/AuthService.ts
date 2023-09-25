import config from "../config/config";
import prisma from "../prisma";
import * as jwt from "jsonwebtoken";

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

// async function verifyToken(params: type) {}

async function logout(token: string) {
  try {
    if (!config.SECRET_KEY) {
      console.log("SECRET_KEY is undefined");
      return false;
    }
    jwt.verify(token, config.SECRET_KEY);
    return true;
  } catch (err) {
    console.log("Logout failed:", err);
    return false;
  }
}

const AuthServices = {
  login,
  // verifyToken,
  logout,
};

export default AuthServices;
