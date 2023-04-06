import { clearUsers, createWaitlistUsers } from "../../__utils__/testHelpers";
import { waitlistOpen } from "../../src/common/utility";
import { AppDataSource } from "../../src/data-source";

beforeAll(async () => {
  await clearUsers();
});

afterEach(async () => {
  await clearUsers();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("common/utility.ts waitlistOpen", () => {
  it("returns true when there is availability", async () => {
    const waitlistStatus = await waitlistOpen(99999);
    expect(waitlistStatus).toBe(true);
  });

  it("returns false when the signup queue is full", async () => {
    await createWaitlistUsers(2);
    const waitlistStatus = await waitlistOpen(1);
    expect(waitlistStatus).toBe(false);
  });
});
