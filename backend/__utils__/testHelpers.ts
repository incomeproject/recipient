import { Repository } from "typeorm";
import { faker } from "@faker-js/faker";

import { AppDataSource } from "../src/data-source";
import { User } from "../src/models/User";

export const getUserRepo = async (): Promise<Repository<User>> => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource.getRepository(User);
};

export const createUser = async (): Promise<User> => {
  const userRepo = await getUserRepo();
  return userRepo.create({
    auth_id: faker.datatype.uuid(),
    email: faker.helpers.unique(faker.internet.email),
  });
};

export const createWaitlistUser = async (): Promise<User> => {
  const userRepo = await getUserRepo();
  return userRepo.create({
    email: faker.helpers.unique(faker.internet.email),
  });
};

export const createWaitlistUsers = async (
  userCount: number
): Promise<Array<User>> => {
  const userRepo = await getUserRepo();
  let users: Array<User> = [];
  for (let i = 0; i < userCount; i++) {
    const user = await createWaitlistUser();
    await userRepo.save(user);
    users.push(user);
  }
  return users;
};

export const removeAllUsers = async () => {
  const userRepo = await getUserRepo();
  const oldUsers = await userRepo.find();
  userRepo.remove(oldUsers);
};

export const createDummyUsers = async (
  userCount: number,
  userGenerator: Function
): Promise<Array<User>> => {
  const userRepo = await getUserRepo();
  let users: Array<User> = [];
  for (let i = 0; i < userCount; i++) {
    const user = await userGenerator();
    userRepo.save(user);
    users.push(user);
  }
  return users;
};
