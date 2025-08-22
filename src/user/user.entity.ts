import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn("identity")
  id: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ unique: true, type: "varchar" })
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
