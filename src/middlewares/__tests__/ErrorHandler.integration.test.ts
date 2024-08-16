import express, { Request, Response } from "express";
import request from "supertest";
import ErrorHandler from "../ErrorHandler";
import { CustomException } from "../../exceptions/CustomException";
import { NotFoundException } from "../../exceptions/NotFoundException";

const app = express();

app.get("/generic-error", (req: Request, res: Response) => {
  throw new Error("Generic Error");
});

app.get("/custom-error", (req: Request, res: Response) => {
  throw new CustomException("Custom error message", 400, {
    additional: "info",
  });
});

app.get("/custom-error-no-info", (req: Request, res: Response) => {
  throw new CustomException("Another custom error", 404);
});

app.all("*", (req: Request, res: Response) => {
  throw new NotFoundException("404 Not Found!");
});

app.use(ErrorHandler);

describe("ErrorHandler Middleware Integration Test", () => {
  it("should handle generic error", async () => {
    const response = await request(app).get("/generic-error");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      metadata: {
        status: false,
        message: "Server error, please try again later",
      },
    });
  });

  it("should handle CustomException errors with additiona info", async () => {
    const response = await request(app).get("/custom-error");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      metadata: {
        status: false,
        message: "Custom error message",
      },
      info: { additional: "info" },
    });
  });

  it("should handle CustomException errors without additional info", async () => {
    const response = await request(app).get("/custom-error-no-info");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      metadata: {
        status: false,
        message: "Another custom error",
      },
    });
  });

  it("should return 404 when route is not found", async () => {
    const response = await request(app).get("/custom-404");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      metadata: {
        status: false,
        message: "404 Not Found!",
      },
    });
  });
});
