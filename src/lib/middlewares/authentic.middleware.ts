import { Request, Response, NextFunction } from "express";
import { UnauthenticError } from "../error";
import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";
import { CONFIG } from "@/config";

export const authenticMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const cookie = (req.cookies as { access_token: string }).access_token;
  if (!cookie) return res.error(new UnauthenticError());

  const client = jwksClient({
    jwksUri: CONFIG.JWT_PUBLIC_KEY_PATH || "",
    cache: true,
    rateLimit: true,
  });

  const publicKey = (await client.getSigningKey()).getPublicKey();

  try {
    const user = jwt.verify(cookie, publicKey) as { id: string };
    req.user = { id: user.id };
  } catch (_error) {
    return res.error(new UnauthenticError());
  }
  next();
};
