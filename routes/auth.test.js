//auth.test.js

const request = require("supertest");
const server = require("../server");
const testUtils = require("../test-utils");
const User = require("../models/user");

describe("Auth routes", () => {
  // beforeAll(testUtils.connectDB);
  // afterAll(testUtils.stopDB);
  // afterEach(testUtils.clearDB);

  const user0 = {
    email: "user0@mail.com",
    password: "123password",
    username: "user0",
  };
  const user1 = {
    email: "user1@mail.com",
    password: "456password",
    username: "user1",
  };
  it("should register a user", async () => {
    const res = await request(server).post("/register").send(user0);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message");
  });

  it("should login a user", async () => {
    const res = await request(server)
      .post("/login")
      .send({ email: "test@example.com", password: "password" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
