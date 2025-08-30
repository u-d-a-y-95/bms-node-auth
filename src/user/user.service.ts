import { injectable } from "tsyringe";
import { getHash } from "@/lib/bcrypt";
import { UserRepository } from "./user.repository";
import { QueryFailedError } from "typeorm";
import { ConflictError, HttpError } from "@/lib/error";

@injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: { name: string; email: string; password: string }) {
    const hashPassword = await getHash(data.password);
    const user = this.userRepository.create({
      ...data,
      password: hashPassword,
    });
    try {
      const { password, ...savedUser } = await this.userRepository.save(user);
      return savedUser;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const { code } = error.driverError as { code?: string };
        if (code === "23505")
          throw new ConflictError("Email is already registered");
      }
      throw new HttpError(500, "Something went wrong");
    }
  }

  getUserByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
