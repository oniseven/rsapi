import express, { NextFunction, Request, Response } from "express";
import request from "supertest";
import AsyncHandler from "../AsyncHandler";

const app = express();

app.get(
  "/success",
  AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send('OK');
  })
);

app.get(
  "/error",
  AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    throw new Error("Test error");
  })
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({
    message: err.message
  })
});

describe("AsyncHandler Middleware Integration Test", () => {
  it('should handle successful async functions', async () => {
    const response =  await request(app).get('/success');
    expect(response.status).toBe(200);
    expect(response.text).toBe('OK');
  });

  it('should handle errors in async functions and call error handler', async () => {
    const response = await request(app).get('/error');
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Test error');
  })
})