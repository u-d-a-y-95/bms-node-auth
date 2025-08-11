import { app } from "@/app";
import request from "supertest";

describe("POST /auth/register", () => {
  it("should return 201 when valid data is sent", async () => {
    const res = await request(app).post("/register").send({
      name: "John Doe",
      email: "john@example.com",
      password: "StrongPassword123",
    });
    expect(res.status).toBe(201);
  });

  it("should return 400 if required fields are missing", async () => {
    const res = await request(app).post("/register").send({
      email: "john@example.com",
      // missing name and password
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
