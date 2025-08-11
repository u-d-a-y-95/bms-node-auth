import { Request, Response } from "express";
import { injectable } from "tsyringe";

@injectable()
export class AuthController {
  register = (_req: Request, res: Response) => {
    res.success({
      status: 201,
      data: { id: 10 },
    });
  };
}
