import { UserService } from "@/user/user.service";
import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { RegisterRequestPayloadDto } from "./dtos/register-request.dto";
import { LoginRequestPayloadDto } from "./dtos/login-request.dto";
import { AuthService } from "./auth.service";

@injectable()
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  register = async (req: Request, res: Response) => {
    const data = req.body as RegisterRequestPayloadDto;
    try {
      const user = await this.userService.createUser(data);
      return res.success({ status: 201, data: user });
    } catch (error) {
      if (error instanceof Error)
        return res.error({ status: 500, error: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    const data = req.body as LoginRequestPayloadDto;
    const user = await this.userService.getUserByEmail(data.email);
    if (!user)
      return res.error({ status: 401, error: "email or password is invalid" });

    const isValidPassword = await this.authService.isValidPassword(
      data.password,
      user.password,
    );

    if (!isValidPassword)
      return res.error({ status: 401, error: "email or password is invalid" });

    const access_token = this.authService.getAccessToken({ id: user.id });

    if (!access_token)
      return res.error({ status: 500, error: "Something went wrong" });

    const refresh_token = this.authService.getRefreshToken({ id: user.id });
    if (!refresh_token)
      return res.error({ status: 500, error: "Something went wrong" });

    res.cookie("access_token", access_token, {
      httpOnly: true,
      maxAge: this.authService.getAccessTokenExpireTime(),
    });
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: this.authService.getRefreshTokenExpireTime(),
    });
    return res.success({ data: { id: user.id } });
  };

  logout = (_req: Request, res: Response) => {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    return res.success({ data: {} });
  };
}
