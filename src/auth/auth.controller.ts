import { UserService } from "@/user/user.service";
import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { RegisterRequestPayloadDto } from "./dtos/register-request.dto";

@injectable()
export class AuthController {
  constructor(private userService: UserService) {}
  register = async (req: Request, res: Response) => {
    const data = req.body as RegisterRequestPayloadDto;
    try {
      const user = await this.userService.createUser(data);
      res.success({ status: 201, data: user });
    } catch (error) {
      if (error instanceof Error)
        res.error({ status: 500, error: error.message });
    }
  };

  login = (_req: Request, res: Response) => {
    res.success({
      status: 201,
      data: { id: 10 },
    });
  };
}
