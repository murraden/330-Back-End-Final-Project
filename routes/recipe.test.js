//recipe.test.js
require("dotenv").config();
const request = require("supertest");
const server = require("../server");
const testUtils = require("../test-utils");
const User = require("../models/user");

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
  console.log("Login response:", loginRes.body);
  token = loginRes.body.token;
  console.log("Login token:", token);
});

afterAll(async () => {
  await testUtils.stopDB();
});

afterEach(testUtils.clearDB);

describe("Recipes", () => {
  it("should create a recipe", async () => {
    const res = await request(server)
      .post("/recipe")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Recipe",
        ingredients: "Test Ingredients",
        instructions: "Test Instructions",
        tags: ["test"],
      });
    console.log("Response:", res.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("title", "Test Recipe");
  });

  it("should get all recipes", async () => {
    const res = await request(server).get("/recipe");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
