import request from "supertest";
import { app } from "../../server";
import mongoose from "mongoose";

describe("Product Routes", () => {
  let productId: string;

  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb");
  });

  afterAll(async () => {
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
    await mongoose.connection.close();
  });

  describe("Product Creation", () => {
    test("should create a product", async () => {
      const response = await request(app).post("/api/products").send({
        name: "Test Product",
        price: 100,
        countInStock: 10,
        category: "Test Category",
      });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe("Test Product");
      productId = response.body._id;
    });

    test("should return validation error for missing fields", async () => {
      const response = await request(app).post("/api/products").send({
        countInStock: 10,
        category: "Test Category",
      });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe("Product Retrieval", () => {
    test("should get all products", async () => {
      const response = await request(app).get("/api/products");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    test("should return 404 for non-existing product", async () => {
      const response = await request(app).get("/api/products/nonExistingId");
      expect(response.status).toBe(404);
    });

    test("should get a product by ID", async () => {
      const response = await request(app).get(`/api/products/${productId}`);
      expect(response.status).toBe(200);
      expect(response.body._id).toBe(productId);
    });
  });

  describe("Product Update", () => {
    test("should update a product", async () => {
      const response = await request(app)
        .put(`/api/products/${productId}`)
        .send({ name: "Updated Product" });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Updated Product");
    });

    test("should return 404 for updating non-existing product", async () => {
      const response = await request(app)
        .put(`/api/products/nonExistingId`)
        .send({ name: "Non-existent Product" });

      expect(response.status).toBe(404);
    });
  });

  describe("Product Deletion", () => {
    test("should delete a product", async () => {
      const response = await request(app).delete(`/api/products/${productId}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Product deleted");
    });

    test("should return 404 for deleting non-existing product", async () => {
      const response = await request(app).delete(`/api/products/nonExistingId`);
      expect(response.status).toBe(404);
    });
  });
});