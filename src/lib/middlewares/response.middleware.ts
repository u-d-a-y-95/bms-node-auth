import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";
export interface SuccessResponseOption<T> {
  data: T;
  message?: string;
  status?: number;
  success?: boolean;
}

export interface ErrorResponseOption {
  error: unknown;
  message?: string;
  status?: number;
  success?: boolean;
}

export const responseMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.success = function <T>(options: SuccessResponseOption<T>) {
    const { data, message = "Success", status = 200, success = true } = options;

    logger.info({ success, status, message, data });

    res.status(status).json({
      success,
      status,
      message,
      data,
      error: null,
    });
  };

  res.error = function (options: ErrorResponseOption) {
    const {
      error,
      message = "Failed",
      status = 500,
      success = false,
    } = options;

    logger.error({ success, status, message, error });
    res.status(status).json({
      success,
      status,
      message,
      data: null,
      error,
    });
  };

  next();
};

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error(error);
  res.status(500).json({
    success: false,
    status: 500,
    message: "Internal Server Error",
    data: null,
    error,
  });
};
