import { AuthService } from "@/auth/auth.service";
import { Request, Response, NextFunction } from "express";
import { UnauthenticError } from "../error";
// import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";

export const authenticMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const cookie = (req.cookies as { access_token: string }).access_token;
  if (!cookie) return res.error(new UnauthenticError());
  const authService = new AuthService();
  try {
    const user = authService.verifyAccessToken(cookie) as { id: string };
    req.user = { id: user.id };
  } catch (_error) {
    // if (error instanceof TokenExpiredError)
    //   // store error trace stack
    //   return res.error({ status: 401, error: "Unauthentic user" });
    // if (error instanceof JsonWebTokenError)
    //   return res.error({ status: 401, error: "Unauthentic user" });
    return res.error(new UnauthenticError());
  }
  next();
};
