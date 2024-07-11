import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { IValidationError } from '../interfaces/validations/validationError.interface';

export const requestValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().reduce(
      (acc, error) => {
        /**
         * Se realiza esta operacion por un problema de tipados
         * ya que no detecta algunas de las propiedades a utilizar
         * las cuales si estan en el objeto original
         */
        const err = JSON.stringify(error);
        const newError: IValidationError = JSON.parse(err);

        if (!newError.path) newError.path = 'common';

        if (!acc[newError.path]) {
          acc[newError.path] = [];
        }
        acc[newError.path].push(newError.msg);
        return acc;
      },
      {} as Record<string, string[]>,
    );

    return res.status(400).json({
      status: 400,
      message: 'Validation error',
      errors: formattedErrors,
    });
  }
  next();
};
