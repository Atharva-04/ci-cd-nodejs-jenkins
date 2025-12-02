import request from "supertest";
import { expect } from "chai";
import app from "../src/server.js";

describe("GET /", () => {
  it("should return CI/CD message", async () => {
    const res = await request(app).get("/");
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("CI/CD Pipeline Active 🚀");
  });
});
