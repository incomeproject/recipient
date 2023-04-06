import { Repository } from "typeorm";
import { faker } from "@faker-js/faker";
import request from "supertest";

import app from "../src/app";
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

export const clearUsers = async () => {
  const userRepo = await getUserRepo();
  await userRepo.clear();
};

export const createAuthedUser = async (): Promise<User> => {
  const userRepo = await getUserRepo();
  const user = userRepo.create({
    id: 1,
    auth_id: "15aae548-9b20-48b1-a22a-799a0c42c35a",
    email: "info@incomeproject.org",
  });
  await userRepo.save(user);
  return user;
};

export const getAuthHeaders = async () => {
  const res = await request(app)
    .post("/auth/signin")
    .send({
      formFields: [
        {
          id: "email",
          value: "info@incomeproject.org",
        },
        {
          id: "password",
          value: "password123",
        },
      ],
    })
    .set({
      apiBasePath: "/auth",
      rid: "emailpassword",
      "st-auth-mode": "cookie",
    });

  const cookies = res.headers["set-cookie"];
  let cookie = cookies.filter((el) => el.startsWith("sAccessToken"));
  cookie = cookie[0].split(";")[0];
  return {
    apiBasePath: "/auth",
    rid: "emailpassword",
    Cookie: cookie,
  };
};
