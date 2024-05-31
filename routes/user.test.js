//user.test.js

const request = require("supertest");
const server = require("../server");
const testUtils = require("../test-utils");
const user = require("../models/user");

let token;

const user0 = {
  email: "user0@mail.com",
  password: "123password",
  username: "user0",
};

beforeAll(async () => {
  await testUtils.connectDB();
  await request(server).post("/auth/signup").send(user0);
  const loginRes = await request(server)
    .post("/auth/login")
    .send({ email: "user0@mail.com", password: "123password" });
  token = loginRes.body.token;
  console.log("Login token:", token);
});

afterAll(async () => {
  await testUtils.stopDB();
});

afterEach(testUtils.clearDB);

describe("User", () => {
  it("should get user profile", async () => {
    const res = await request(server)
      .get("/profile")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("username", "user0");
    expect(res.body).not.toHaveProperty("password");
  });
});
