import { config } from "dotenv";
config();

const {
  NODE_ENV,
  PORT,
  SERVICE_NAME,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

export const CONFIG = {
  NODE_ENV,
  PORT,
  SERVICE_NAME,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
};
