import * as dotenv from "dotenv";

dotenv.config();

const { DATABASE_URL, PORT, HOST, SWAGGER_URL, SECRET_KEY, EXPIRE } =
  process.env;

const config = {
  DATABASE_URL,
  PORT,
  HOST,
  SWAGGER_URL,
  SECRET_KEY,
  EXPIRE,
};

export default config;
