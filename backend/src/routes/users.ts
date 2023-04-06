import express, { Express, Request, Response, NextFunction } from "express";
import { SessionRequest } from "supertokens-node/framework/express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";

import { AppDataSource } from "../data-source";
import { User } from "../models/User";

export const userRouter = express.Router();

// userRouter.use("/", (req: Request, res: Response, next: NextFunction): void => {
//   res.json({ message: "One day there will be things here." });
// });

const userRepo = AppDataSource.getRepository(User);
userRouter.get(
  "/:id",
  verifySession(),
  async (req: SessionRequest, res: Response) => {
    const id = parseInt(req.params.id);
    const auth_id = req.session!.getUserId();
    const user = await userRepo.findOneBy({
      id: id,
      auth_id: auth_id,
    });
    res.status(200).json(user);
  }
);

userRouter.post("/", async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = new User();
  user.email = email;
  await userRepo.save(user);

  res.status(200).json(user);
});
