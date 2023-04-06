import express, { Express, Request, Response, NextFunction } from "express";

import { waitlistOpen } from "../common/utility";

export const indexRouter = express.Router();

indexRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const waitlistStatus = await waitlistOpen();
      res.status(200).json({
        waitlistOpen: waitlistStatus,
      });
    } catch (error) {
      res.status(500).json({ message: "Unknown error" });
    }
  }
);
