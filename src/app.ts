import "reflect-metadata";
import express, { Response, Request, NextFunction } from "express";
import { routes } from "./routes";
import {
  errorMiddleware,
  responseMiddleware,
} from "@/lib/middlewares/response.middleware";

export const app = express();

app.use(express.json());
app.use(responseMiddleware);
app.use(routes);
app.get("/", (_req: Request, res: Response, _next: NextFunction) => {
  res.success({ data: "hello" });
});

app.use(errorMiddleware);
