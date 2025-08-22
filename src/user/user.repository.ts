import { dataSource } from "@/data-source";
import { UserEntity } from "./user.entity";
import { injectable } from "tsyringe";
import { Repository } from "typeorm";

@injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor() {
    super(UserEntity, dataSource.manager);
  }
}
