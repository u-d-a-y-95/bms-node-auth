import { UserService } from "@/user/user.service";
import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { RegisterRequestPayloadDto } from "./dtos/register-request.dto";
import { LoginRequestPayloadDto } from "./dtos/login-request.dto";
import { AuthService } from "./auth.service";
import { HttpError, UnauthenticError } from "@/lib/error";
import { JwtPayload } from "jsonwebtoken";

@injectable()
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  private setAuthCookies(payload: JwtPayload, res: Response) {
    const access_token = this.authService.getAccessToken(payload);
    if (!access_token) return res.error(new HttpError());

    const refresh_token = this.authService.getRefreshToken(payload);
    if (!refresh_token) return res.error(new HttpError());

    res.cookie("access_token", access_token, {
      httpOnly: true,
      maxAge: this.authService.getAccessTokenExpireTime() * 1000,
    });
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: this.authService.getRefreshTokenExpireTime() * 1000,
    });
  }

  register = async (req: Request, res: Response) => {
    const data = req.body as RegisterRequestPayloadDto;
    try {
      const user = await this.userService.createUser(data);
      return res.success({ status: 201, data: user });
    } catch (error) {
      if (error instanceof HttpError) return res.error(error);
      return res.error({ status: 500, error: error });
    }
  };

  login = async (req: Request, res: Response) => {
    const data = req.body as LoginRequestPayloadDto;
    const user = await this.userService.getUserByEmail(data.email);
    if (!user)
      return res.error(new UnauthenticError("email or password is invalid"));

    const isValidPassword = await this.authService.isValidPassword(
      data.password,
      user.password,
    );

    if (!isValidPassword)
      return res.error(new UnauthenticError("email or password is invalid"));

    await this.setAuthCookies({ id: user.id }, res);
    return res.success({ data: { id: user.id } });
  };

  refresh = async (req: Request, res: Response) => {
    const refresh_cookie = (req.cookies as { refresh_token: string })
      .refresh_token;
    if (!refresh_cookie) return res.error(new UnauthenticError());

    try {
      const user = this.authService.verifyRefreshToken(refresh_cookie) as {
        id: string;
      };
      await this.setAuthCookies({ id: user.id }, res);
      return res.success({ data: { id: user.id } });
    } catch (_error) {
      return res.error(new UnauthenticError());
    }
  };

  logout = (_req: Request, res: Response) => {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    return res.success({ data: {} });
  };
}
