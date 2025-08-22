import { injectable } from "tsyringe";
import { getHash } from "@/lib/bcrypt";
import { UserRepository } from "./user.repository";
import { QueryFailedError } from "typeorm";

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
      const savedUser = await this.userRepository.save(user);
      return savedUser;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const { code } = error.driverError as { code?: string };
        if (code === "23505") {
          throw new Error("Email is already registered");
        }
      }
    }
  }
}
