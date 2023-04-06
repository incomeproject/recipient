import express, { Express, Request, Response, NextFunction } from "express";
import { SessionRequest } from "supertokens-node/framework/express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";

import { AppDataSource } from "../data-source";
import { User } from "../models/User";

export const userRouter = express.Router();

const userRepo = AppDataSource.getRepository(User);
userRouter.get(
  "/:id",
  verifySession(),
  async (req: SessionRequest, res: Response) => {
    try {
      const id = req.params.id;
      const auth_id = req.session!.getUserId();
      const user = await userRepo.findOneBy({
        id: id,
      });

      if (user && auth_id && user.auth_id == auth_id) {
        res.status(200).json(user);
      } else {
        res.status(401).json({ message: "unauthorized" });
      }
    } catch (error) {
      res.status(300).json({ error: error });
    }
  }
);

userRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = new User();
    user.email = email;
    await userRepo.save(user);
    res.status(200).json(user);
  } catch (error) {
    if (error?.driverError?.detail?.includes("already exists")) {
      res.status(409).json({ message: "Email already exists" });
    } else {
      res.status(400).json({ message: "Invalid request body" });
    }
  }
});
