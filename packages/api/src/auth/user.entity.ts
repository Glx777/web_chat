import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
} from "typeorm"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", unique: true })
  username: string

  @Column({ type: "varchar" })
  password: string

  @CreateDateColumn()
  createdAt: Date
}
