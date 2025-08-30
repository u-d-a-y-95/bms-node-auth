import "reflect-metadata";
import express, { Response, Request, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { routes } from "./routes";
import {
  errorMiddleware,
  responseMiddleware,
} from "@/lib/middlewares/response.middleware";
import { NotFoundError } from "./lib/error";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(responseMiddleware);
app.use(routes);
app.get("/health", (_req: Request, res: Response, _next: NextFunction) => {
  return res.success({ data: "ok" });
});

app.use((_req: Request, res: Response) => res.error(new NotFoundError()));

app.use(errorMiddleware);
