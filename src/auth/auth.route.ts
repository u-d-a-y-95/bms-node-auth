import express from "express";
import { container } from "tsyringe";
import { AuthController } from "./auth.controller";
import { RegisterRequestPayloadDto } from "./dtos/register-request.dto";
import { validate } from "@/lib/middlewares/validate.middleware";
import { LoginRequestPayloadDto } from "./dtos/login-request.dto";
import { authenticMiddleware } from "@/lib/middlewares/authentic.middleware";

export const authRoutes = express.Router();

const authController = container.resolve(AuthController);

authRoutes.post(
  "/register",
  validate(RegisterRequestPayloadDto),
  authController.register,
);

authRoutes.post(
  "/login",
  validate(LoginRequestPayloadDto),
  authController.login,
);

authRoutes.post("/logout", authenticMiddleware, authController.logout);
