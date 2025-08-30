import { compareHash } from "@/lib/bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { injectable } from "tsyringe";
import fs from "fs";
import path from "path";
import { CONFIG } from "@/config";

@injectable()
export class AuthService {
  isValidPassword(password: string, hashedPassword: string) {
    return compareHash(password, hashedPassword);
  }

  getAccessTokenExpireTime() {
    return CONFIG.JWT_ACCESS_TOKEN_EXPIREIN * 60;
  }

  getRefreshTokenExpireTime() {
    return CONFIG.JWT_REFRESH_TOKEN_EXPIREIN * 60;
  }

  getAccessToken(data: JwtPayload) {
    try {
      const secret = fs.readFileSync(
        path.join(__dirname, "../..", "certs", "private.pem"),
      );
      const expiresIn = this.getAccessTokenExpireTime();
      return jwt.sign(data, secret, {
        algorithm: "RS256",
        expiresIn,
        issuer: CONFIG.SERVICE_NAME,
      });
    } catch (_error) {
      return null;
    }
  }

  getRefreshToken(data: JwtPayload) {
    try {
      const expiresIn = this.getRefreshTokenExpireTime();
      const secret = CONFIG.JWT_REFRESH_TOKEN_SECRET;
      if (!secret) return null;
      return jwt.sign(data, secret, {
        algorithm: "HS256",
        expiresIn,
        issuer: CONFIG.SERVICE_NAME,
      });
    } catch (_error) {
      return null;
    }
  }

  verifyAccessToken(token: string) {
    const publicKey = fs.readFileSync(
      path.join(__dirname, "../..", "certs", "public.pem"),
    );
    return jwt.verify(token, publicKey);
  }
}
