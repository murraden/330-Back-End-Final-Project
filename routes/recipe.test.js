require("dotenv").config();
const request = require("supertest");
const server = require("../server");
const testUtils = require("../test-utils");
const User = require("../models/user");
const Recipe = require("../models/recipe");

let token;
let userId;

const user0 = {
  email: "user0@mail.com",
  password: "123password",
  username: "user0",
};

const recipe1 = {
  title: "recipe1",
  ingredients: "recipe1 ingredients",
  instructions: "recipe1 instructions",
  tags: ["recipe1 tag"],
  author: user0,
};

beforeEach(async () => {
  await testUtils.connectDB();
  await request(server).post("/auth/signup").send(user0);
  const loginRes = await request(server)
    .post("/auth/login")
    .send({ email: user0.email, password: user0.password });
  token = loginRes.body.token;
  userId = loginRes.body.user._id;
  console.log("Token:", token);
  console.log("User ID:", userId);

  const recipeRes = await request(server)
    .post("/recipe")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "Global Test Recipe",
      ingredients: "Global Test Ingredients",
      instructions: "Global Test Instructions",
      tags: ["global"],
    });
  globalRecipe = recipeRes.body;
  globalRecipe_id = recipeRes.body._id;
  console.log("Global Recipe:", globalRecipe);
  console.log("global_id", globalRecipe_id);
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
    console.log("Create Recipe Response:", res.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("title", "Test Recipe");
    expect(res.body).toHaveProperty("author", userId);
  });

  it("should return 400 if title is missing", async () => {
    const res = await request(server)
      .post("/recipe")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ingredients: "Valid Ingredients",
        instructions: "Valid Instructions",
        tags: ["valid", "tags"],
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty(
      "message",
      "Bad format: Title is required and should be a string"
    );
  });

  it("should return 400 if ingredients are missing", async () => {
    const res = await request(server)
      .post("/recipe")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Valid Title",
        instructions: "Valid Instructions",
        tags: ["valid", "tags"],
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty(
      "message",
      "Bad format: Ingredients are required and should be a string"
    );
  });

  it("should return 400 if instructions are missing", async () => {
    const res = await request(server)
      .post("/recipe")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Valid Title",
        ingredients: "Valid Ingredients",
        tags: ["valid", "tags"],
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty(
      "message",
      "Bad format: Instructions are required and should be a string"
    );
  });

  it("should return 400 if tags are not an array", async () => {
    const res = await request(server)
      .post("/recipe")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Valid Title",
        ingredients: "Valid Ingredients",
        instructions: "Valid Instructions",
        tags: "not an array",
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty(
      "message",
      "Bad format: Tags should be an array"
    );
  });

  it("should get all recipes", async () => {
    const res = await request(server).get("/recipe");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    console.log("array", res.body);
  });

  it("should get a recipe by ID", async () => {
    console.log(globalRecipe);
    console.log(globalRecipe_id);
    const res = await request(server).get(`/recipe/${globalRecipe_id}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("title", "Global Test Recipe");
    expect(res.body).toHaveProperty("author", userId.toString());
  });

  it("should return 404 for non-existent recipe", async () => {
    const res = await request(server).get("/recipe/60b5edc3412e7b4b78b0aef5");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Recipe not found");
  });

  it("should update a recipe", async () => {
    const newRecipe = new Recipe({
      title: "Test Recipe",
      ingredients: "Test Ingredients",
      instructions: "Test Instructions",
      tags: ["test"],
      author: userId,
    });
    await newRecipe.save();
    const res = await request(server)
      .put(`/recipe/${newRecipe._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Recipe",
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("title", "Updated Recipe");
  });

  it("should return 403 when updating another user's recipe", async () => {
    const user1 = await new User({
      email: "user1@mail.com",
      password: "123password",
      username: "user1",
    }).save();
    const newRecipe = new Recipe({
      title: "Test Recipe",
      ingredients: "Test Ingredients",
      instructions: "Test Instructions",
      tags: ["test"],
      author: user1._id,
    });
    await newRecipe.save();
    const res = await request(server)
      .put(`/recipe/${newRecipe._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Recipe",
      });
    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("message", "Unauthorized");
  });

  it("should delete a recipe", async () => {
    const newRecipe = new Recipe({
      title: "Test Recipe",
      ingredients: "Test Ingredients",
      instructions: "Test Instructions",
      tags: ["test"],
      author: userId,
    });
    await newRecipe.save();
    const res = await request(server)
      .delete(`/recipe/${newRecipe._id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Recipe removed");
  });

  it("should return 403 when deleting another user's recipe", async () => {
    const user1 = await new User({
      email: "user1@mail.com",
      password: "123password",
      username: "user1",
    }).save();
    const newRecipe = new Recipe({
      title: "Test Recipe",
      ingredients: "Test Ingredients",
      instructions: "Test Instructions",
      tags: ["test"],
      author: user1.id,
    });
    await newRecipe.save();
    const res = await request(server)
      .delete(`/recipe/${newRecipe._id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("message", "Unauthorized");
  });

  it("should search for recipes", async () => {
    const newRecipe = new Recipe({
      title: "Special Test Recipe",
      ingredients: "Special Test Ingredients",
      instructions: "Special Test Instructions",
      tags: ["special"],
      author: userId,
    });
    await newRecipe.save();
    const res1 = await request(server).get("/recipe/search?query=Special");
    expect(res1.status).toBe(200);
    expect(res1.body).toBeInstanceOf(Array);
    expect(res1.body.length).toBeGreaterThan(0);
    const res2 = await request(server).get("/recipe/search?query=InvalidQuery");
    expect(res2.status).toBe(404);
    expect(res2.body).toEqual({ message: "No recipes found" });
  });
});
