import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";

import { middleware } from "supertokens-node/framework/express";

import { frontendPort } from "./common/constants";
import supertokens from "./common/supertokens";
import { indexRouter } from "./routes";

const app: Express = express();

app.use(
  cors({
    origin: `http://localhost:${frontendPort}`,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);

app.use("/", indexRouter);
app.use(middleware());

export default app;
