import { plainToInstance, ClassConstructor } from "class-transformer";
import { validate as classValidate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validate<T extends object>(dtoClass: ClassConstructor<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(dtoClass, req.body);
    const errors: ValidationError[] = await classValidate(dto);

    if (errors.length > 0) {
      const formattedErrors = errors.reduce(
        (acc, error) => {
          acc[error.property] = Object.values(error.constraints || {});
          return acc;
        },
        {} as Record<string, string[]>,
      );

      res.error({
        status: 400,
        message: "Validation Error",
        error: {
          code: "BAD_REQUEST",
          details: formattedErrors,
        },
      });
    } else {
      req.body = dto;
      next();
    }
  };
}
