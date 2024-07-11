/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { HttpCustomException } from '../exceptions/httpCustomException';

const errorHandlerMiddleware = (
  err: HttpCustomException,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof HttpCustomException) {
    res.status(err.status).json(err.createBody());
  } else {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
};

export default errorHandlerMiddleware;
