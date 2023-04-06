import { IsNull } from "typeorm";

import { AppDataSource } from "../data-source";
import { User } from "../models/User";
import { env } from "./constants";

export const waitlistOpen = async (
  maxWaitlist: number = env.WAITLIST_COUNT
): Promise<boolean> => {
  const userRepo = AppDataSource.getRepository(User);
  const waitlistCount = await userRepo.count({
    where: {
      auth_id: IsNull(),
    },
  });
  return maxWaitlist > waitlistCount;
};
