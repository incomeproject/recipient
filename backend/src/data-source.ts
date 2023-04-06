import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User";
import { env } from "./common/constants";

let host = env.DEV_DB_HOST;
let port = env.DEV_DB_PORT;
let username = env.DEV_DB_USER;
let password = env.DEV_DB_PASSWORD;
let database = env.DEV_DB_NAME;

if (env.NODE_ENV == "test") {
  host = env.TEST_DB_HOST;
  port = env.TEST_DB_PORT;
  username = env.TEST_DB_USER;
  password = env.TEST_DB_PASSWORD;
  database = env.TEST_DB_NAME;
}

export const AppDataSource = new DataSource({
  type: "postgres",
  host: host,
  port: port,
  username: username,
  password: password,
  database: database,
  synchronize: ["development", "test"].includes(env.NODE_ENV),
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
