import express from "express";
import { authRoutes } from "./auth/auth.route";

export const routes = express.Router();

routes.use(authRoutes);
