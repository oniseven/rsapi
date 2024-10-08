import { Response, Request, NextFunction } from "express";
import { CustomException } from "../exceptions/CustomException";
import { ResponseMetadata } from "../types";

export default function ErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  // console.log("🚀 ~ err:", err)
  let response: ResponseMetadata = {
    metadata: {
      status: false,
      message: "Server error, please try again later",
    },
  };

  if (!(err instanceof CustomException)) {
    // console.error(err)
    return res.status(500).json(response);
  }

  response.metadata.status = false;
  response.metadata.message = err.message;
  if (err.additionalInfo) response.info = err.additionalInfo;

  const statusCode = err.status || 500;
  return res.status(statusCode).json(response);
}
