import { DataSource } from "typeorm";
import { CONFIG } from "./config";

export const dataSource = new DataSource({
  type: "postgres",
  host: CONFIG.DB_HOST,
  port: Number(CONFIG.DB_PORT),
  username: CONFIG.DB_USERNAME,
  password: CONFIG.DB_PASSWORD,
  database: CONFIG.DB_NAME,
  synchronize: true,
  entities: [],
  subscribers: [],
  migrations: [],
});
