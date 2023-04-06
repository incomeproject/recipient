import request from "supertest";

import app from "../../src/app";
import { AppDataSource } from "../../src/data-source";
import { clearUsers } from "../../__utils__/testHelpers";

beforeAll(async () => {
  await clearUsers();
});

afterAll(async () => {
  await clearUsers();
  await AppDataSource.destroy();
});

describe('get("/")', () => {
  it("returns status of waitlist", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.waitlistOpen).toBe(true);
  });
});
