import express, { Express, Request, Response, NextFunction } from "express";

export const indexRouter = express.Router();

indexRouter.use(
  "/",
  (req: Request, res: Response, next: NextFunction): void => {
    res.json({ message: "One day there will be things here." });
  }
);
