// src/middlewares/__tests__/ErrorHandler.test.ts
import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../ErrorHandler';
import { CustomException } from '../../exceptions/CustomException';

describe('ErrorHandler Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    next = jest.fn();
  });

  it('should handle CustomException', () => {
    const error = new CustomException('Custom error', 400);
    ErrorHandler(error, req as Request, res as Response, next);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      metadata: {
        status: false,
        message: 'Custom error',
      }
    });
  });

  it('should handle generic errors', () => {
    const error = new Error('Generic error');
    ErrorHandler(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      metadata: {
        status: false,
        message: 'Server error, please try again later',
      }
    });
  });
});