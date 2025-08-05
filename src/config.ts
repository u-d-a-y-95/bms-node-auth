import { config } from "dotenv";
config();

const { NODE_ENV, PORT, SERVICE_NAME } = process.env;

export const CONFIG = {
  NODE_ENV,
  PORT,
  SERVICE_NAME,
};
