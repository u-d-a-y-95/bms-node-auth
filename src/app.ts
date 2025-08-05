import express, { ErrorRequestHandler } from "express";
import { HttpError } from "./error";
import { logger } from "./logger";

export const app = express();

app.use(express.json());

app.use(((error, _req, res, _next) => {
  logger.error(error);

  if (error instanceof HttpError) {
    res.status(error.status).json({
      status: error.status,
      message: error.message,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: "Internal Server Error",
  });
}) satisfies ErrorRequestHandler);
