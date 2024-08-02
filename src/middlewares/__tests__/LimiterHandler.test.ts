import express from "express";
import LimiterHandler from "../LimiterHandler";
import request from "supertest";

const app = express();
app.use(LimiterHandler);

app.get("/test", (req, res) => {
  res.status(200).send("OK");
});

describe("LimiterHandler Middleware", () => {
  beforeAll(() => {
    process.env.REQ_LIMIT = "5"; // Set your desired limit
    process.env.REQ_MS = "60000"; // 1 minute window
  });

  it("should allow request within the limit", async () => {
    const reqLimit = Number(process.env.REQ_LIMIT);

    for (let i = 0; i < reqLimit; i++) {
      const response = await request(app).get("/test");
      expect(response.status).toBe(200);
      expect(response.text).toBe("OK");
    }
  });

  it("should block request exceeding the limit", async () => {
    const reqLimit = Number(process.env.REQ_LIMIT);

    for (let i = 0; i < reqLimit; i++) {
      await request(app).get("/test");
    }

    const response = await request(app).get("/test");
    expect(response.status).toBe(429);
    expect(response.text).toBe(
      "You can't make any more request at the moment. Try again later."
    );
  });
});
