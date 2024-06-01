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

  it("should signup a user and return a 200", async () => {
    const res = await request(server).post("/auth/signup").send(user0);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    const userInDb = await User.findOne({ email: user0.email });
    expect(userInDb).not.toBeNull();
    expect(userInDb.email).toBe(user0.email);
  });

  it("should return 400 if email already exists", async () => {
    await new User({
      username: "bob",
      email: "bob@mail.com",
      password: "password",
    }).save();

    const res = await request(server).post("/auth/signup").send({
      username: "notbob",
      email: "bob@mail.com",
      password: "password",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Email already exists");
  });

  it("should return 400 if username already exists", async () => {
    await new User({
      username: "mike",
      email: "mike@mail.com",
      password: "password",
    }).save();

    const res = await request(server).post("/auth/signup").send({
      username: "mike",
      email: "notmike@mail.com",
      password: "password",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Username already exists");
  });

  it("should return 500 if there's an error during registration", async () => {
    const res = await request(server).post("/auth/signup").send({});
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("error");
  });

  it("should login a user and return a 200", async () => {
    await request(server).post("/auth/signup").send(user0);
    const res1 = await request(server).post("/auth/login").send(user0);
    expect(res1.status).toBe(200);
    expect(res1.body).toHaveProperty("token");
  });

  it("should return 401 if there's an error during login", async () => {
    const res = await request(server).post("/auth/login").send({});

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid credentials");
  });

  it("should return a 401 for invalid password", async () => {
    await request(server).post("/auth/signup").send(user0);
    const res1 = await request(server).post("/auth/login").send({
      email: "user0@mail.com",
      password: "notmatching",
      username: "user0",
    });
    expect(res1.status).toBe(401);
    expect(res1.body).toHaveProperty("message", "Invalid credentials");
  });
});
