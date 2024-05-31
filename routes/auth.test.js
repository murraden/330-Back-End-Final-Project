//auth.test.js

const request = require("supertest");
const server = require("../server");
const testUtils = require("../test-utils");
const User = require("../models/user");

describe("Auth routes", () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);
  afterEach(testUtils.clearDB);

  const user0 = {
    email: "user0@mail.com",
    password: "123password",
    username: "user0",
  };

  it("should register a user and return a 201", async () => {
    const res = await request(server).post("/auth/register").send(user0);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message");
    const userInDb = await User.findOne({ email: user0.email });
    expect(userInDb).not.toBeNull();
    expect(userInDb.email).toBe(user0.email);
  });

  it("should return 400 if there's an error during registration", async () => {
    const res = await request(server).post("/auth/register").send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("should login a user and return a 200", async () => {
    await request(server).post("/auth/register").send(user0);
    const res1 = await request(server).post("/auth/login").send(user0);
    expect(res1.status).toBe(200);
    expect(res1.body).toHaveProperty("token");
  });

  it("should return 400 if there's an error during login", async () => {
    // Send request with invalid data to trigger an error during login
    const res = await request(server).post("/auth/login").send({}); // Empty request body to trigger error

    // Assertion
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Invalid email or password");
  });

  it("should return a 400 for invalid password", async () => {
    await request(server).post("/auth/register").send(user0);
    const res1 = await request(server).post("/auth/login").send({
      email: "user0@mail.com",
      password: "notmatching",
      username: "user0",
    });
    expect(res1.status).toBe(400);
    expect(res1.body).toHaveProperty("message", "Invalid email or password");
  });
});
