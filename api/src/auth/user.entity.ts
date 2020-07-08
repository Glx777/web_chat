import { PrimaryGeneratedColumn, Column, Entity } from "typeorm"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  username: string

  @Column()
  password: string
}
