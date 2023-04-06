import express, { Express } from "express";
import cors from "cors";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import bodyParser from "body-parser";

import supertokens from "./common/supertokens";
import { env } from "./common/constants";

import { indexRouter } from "./routes/";

import "reflect-metadata";
import { userRouter } from "./routes/users";

export const app: Express = express();

app.use(
  cors({
    origin: `http://localhost:${env.FRONTEND_PORT}`,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);

app.use(middleware());
app.use(bodyParser.json());
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use(errorHandler());

export default app;
