import { Response, Request, NextFunction } from "express";
import { CustomException } from "../exceptions/CustomException";
import { ResponseMetadata } from "../types/types";


export default function ErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  let response: ResponseMetadata = {
    metadata: {
      status: false,
      message: "Server error, please try again later",
    },
  };

  if (!(err instanceof CustomException)) return res.status(500).json(response);

  response.metadata.status = false;
  response.metadata.message = err.message;
  if (err.additionalInfo) response.info = err.additionalInfo;

  return res.status(err.status).json(response);
}
