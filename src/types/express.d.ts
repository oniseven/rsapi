import "express";
import { JwtPayload } from "./types";


interface CustomRequest extends Express.Request {
  payload: JwtPayload;
  userToken?: any;
  userKey?: any;
  // biometricToken?: any;
  // device?: {
  //   name: any;
  //   modelName: any;
  // };
}

interface CustomResponse extends Express.Response {
  withData(response: any, status?: boolean, message?: string): Express.Response;
  noData(status?: boolean, message?: string): Express.Response;
  withErrorCode(options: {
    status?: boolean;
    message?: string;
    errCode?: string | null;
    response?: any;
  }): Express.Response;
}

declare module "express-serve-static-core" {
  interface Request extends CustomRequest {}
  interface Response extends CustomResponse {}
}
