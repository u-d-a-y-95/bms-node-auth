import { IsEmail, IsString, Length } from "class-validator";

export class LoginRequestPayloadDto {
  @IsEmail()
  @IsString({ message: "Email must be string" })
  email: string;

  @Length(6, 30, { message: "Password must be between 6 and 30 characters" })
  @IsString({ message: "Password must be a string" })
  password: string;
}
