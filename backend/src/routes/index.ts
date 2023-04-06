import express, { Express, Request, Response, NextFunction } from "express";

import { waitlistOpen } from "../common/utility";

export const indexRouter = express.Router();

indexRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      waitlistOpen: await waitlistOpen(),
    });
  }
);
