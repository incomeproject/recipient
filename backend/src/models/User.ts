import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index()
  @Column({ unique: true, nullable: false })
  email: string;

  @Index()
  @Column({ unique: true, nullable: true })
  auth_id: string;
}
