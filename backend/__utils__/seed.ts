import { AppDataSource } from "../src/data-source";
import { User } from "../src/models/User";

const seedUsers = async (): Promise<void> => {
  const userRepo = AppDataSource.getRepository(User);
  [
    {
      auth_id: "15aae548-9b20-48b1-a22a-799a0c42c35a",
      email: "info@incomeproject.org",
    },
  ].forEach((element) => {
    const user = userRepo.create(element);
    userRepo.save(user);
  });
};

AppDataSource.initialize()
  .then(async () => {
    await AppDataSource.dropDatabase();
    await seedUsers();
  })
  .catch((error) => console.log(error));
