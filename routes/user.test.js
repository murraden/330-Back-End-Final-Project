//user.test.js

const request = require("supertest");
const server = require("../server");
const testUtils = require("../test-utils");
const user = require("../models/user");

let token;

beforeAll(async () => {
  const res = await request(server).post("/api/auth/signup").send({
    username: "testuser",
    email: "test@example.com",
    password: "password",
  });
  const loginRes = await request(server)
    .post("/api/auth/login")
    .send({ email: "test@example.com", password: "password" });
  token = loginRes.body.token;
});

describe("User", () => {
  it("should get user profile", async () => {
    const res = await request(server)
      .get("/api/users/profile")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("username", "testuser");
    expect(res.body).not.toHaveProperty("password");
  });
});
