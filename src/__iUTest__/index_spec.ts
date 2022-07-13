import supertest from "supertest";
import app from "../index";

const request: supertest.SuperTest<supertest.Test> = supertest(app);

// #region "__iUTest__ app-Endpoint"

describe("__iUTest__ app-Endpoint-DEFAULT", () => {
  it("app-Endpoint (GET('/'))", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});

// #endregion
