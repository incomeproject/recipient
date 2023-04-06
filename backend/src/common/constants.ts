import dotenv from "dotenv";
import { cleanEnv, port, str, host, url, num } from "envalid";

dotenv.config({ path: "../.env" });
dotenv.config({ path: "../.secrets.env" });

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ["development", "test", "production"],
    default: "development",
  }),
  BACKEND_PORT: port(),
  FRONTEND_PORT: port(),

  WAITLIST_COUNT: num(),

  SUPERTOKENS_URI: url(),
  SUPERTOKENS_API_KEY: str(),

  DEV_DB_HOST: host(),
  DEV_DB_USER: str(),
  DEV_DB_PASSWORD: str(),
  DEV_DB_NAME: str(),
  DEV_DB_PORT: port(),

  TEST_DB_HOST: host(),
  TEST_DB_USER: str(),
  TEST_DB_PASSWORD: str(),
  TEST_DB_NAME: str(),
  TEST_DB_PORT: port(),
});
