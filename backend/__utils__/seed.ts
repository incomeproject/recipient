import { Repository } from "typeorm";

import { AppDataSource } from "../src/data-source";
import { User } from "../src/models/User";

const seed = async (userRepo: Repository<User>) => {
  const oldUsers = await userRepo.find();
  userRepo.remove(oldUsers);

  [
    {
      id: 1,
      auth_id: "15aae548-9b20-48b1-a22a-799a0c42c35a",
      email: "info@incomeproject.org",
    },
  ].forEach((element) => {
    const user = userRepo.create(element);
    userRepo.save(user);
  });
};

const userRepo = AppDataSource.getRepository(User);

AppDataSource.initialize()
  .then(async () => {
    seed(userRepo);
  })
  .catch((error) => console.log(error));
