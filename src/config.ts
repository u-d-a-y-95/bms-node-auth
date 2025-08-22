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
  HASH_SALT,
} = process.env;

export const CONFIG = {
  NODE_ENV,
  PORT: Number(PORT),
  SERVICE_NAME,
  HASH_SALT: Number(HASH_SALT),
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
};
