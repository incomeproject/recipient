import request from "supertest";

import app from "../../src/app";
import { AppDataSource } from "../../src/data-source";

beforeAll(async () => {
  if (!AppDataSource.isInitialized) await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("index.ts", () => {
  test("index returns status of waitlist", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.waitlistOpen).toBe(true);
  });
});
