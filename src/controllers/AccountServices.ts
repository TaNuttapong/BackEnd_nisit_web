import { FastifyError } from "fastify";
import * as bcrypt from "bcrypt";
import accountServices from "../services/AccountServices";

async function createAccount(request: any, reply: any) {
  try {
    const { email, password } = request.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const account = await accountServices.createAccount({
      email,
      password: hashedPassword,
    });

    if (account) {
      const payload = {
        data: account,
        status: "success",
        message: "Account created successfully.",
      };
      reply.status(200).send(payload);
    } else {
      const payload = {
        data: [],
        status: "fail",
        message: `Don't Find Account`,
      };
      reply.status(403).send(payload);
    }
  } catch (error) {
    reply.status(500).send(error as FastifyError);
  }
}
const accountController = {
  createAccount,
};

export default accountController;
