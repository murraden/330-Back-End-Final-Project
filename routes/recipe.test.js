//recipe.test.js

const request = require("supertest");
const server = require("../server");
const testUtils = require("../test-utils");
const User = require("../models/user");

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

describe("Recipes", () => {
  it("should create a recipe", async () => {
    const res = await request(server)
      .post("/api/recipes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Recipe",
        ingredients: "Test Ingredients",
        instructions: "Test Instructions",
        tags: ["test"],
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("title", "Test Recipe");
  });

  it("should get all recipes", async () => {
    const res = await request(server).get("/api/recipes");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
