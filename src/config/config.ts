import * as dotenv from "dotenv";

dotenv.config();

const { DATABASE_URL, PORT, HOST, SWAGGER_URL } = process.env;

const config = {
  DATABASE_URL,
  PORT,
  HOST,
  SWAGGER_URL,
};

export default config;
