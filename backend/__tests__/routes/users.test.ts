import request from "supertest";
import crypto from "crypto";

import app from "../../src/app";
import { AppDataSource } from "../../src/data-source";
import {
  clearUsers,
  createAuthedUser,
  getAuthHeaders,
  getUserRepo,
} from "../../__utils__/testHelpers";

beforeAll(async () => {
  await clearUsers();
});

afterEach(async () => {
  await clearUsers();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('get("/user/:id")', () => {
  it("requires authentication", async () => {
    const res = await request(app).get(`/user/${crypto.randomUUID()}`);
    expect(res.status).toBe(401);
  });

  it("fails if the session's userID doesn't match the requested user's auth_id", async () => {
    await createAuthedUser();
    const authHeaders = await getAuthHeaders();
    const res = await request(app)
      .get(`/user/${crypto.randomUUID()}`)
      .set(authHeaders);
    expect(res.status).toBe(401);
  });

  it("returns user info if session's userID and requested user's auth_id match", async () => {
    const user = await createAuthedUser();
    const authHeaders = await getAuthHeaders();
    const res = await request(app).get(`/user/${user.id}`).set(authHeaders);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: user.id,
      email: user.email,
      auth_id: user.auth_id,
    });
  });
});

describe('post("/user")', () => {
  it("does not require authentication", async () => {
    const res = await request(app)
      .post("/user")
      .send({ email: "info@incomeproject.org" });
    expect(res.status).not.toBe(401);
  });

  it("fails with invalid input", async () => {
    const res = await request(app)
      .post("/user")
      .send({ phone: "info@incomeproject.org" });
    expect(res.status).toBe(400);
  });

  it("fails when given an email address that already exists", async () => {
    const user = await createAuthedUser();
    const res = await request(app).post("/user").send({ email: user.email });
    expect(res.status).toBe(409);
  });

  it("creates and returns a user", async () => {
    const email = "info@incomeproject.org";
    const userRepo = await getUserRepo();
    const res = await request(app).post("/user").send({ email: email });

    expect(res.status).toBe(200);
    expect(res.body.email).toBe(email);
    const user = await userRepo.findOneBy({
      email: email,
    });
    expect(user).not.toBeNull;
  });
});
