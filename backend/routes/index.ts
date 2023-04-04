import express, { Express, Request, Response, NextFunction } from "express";

export const indexRouter = express.Router();

indexRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("got request");
  res.send("Express + TypeScript Server");
});
