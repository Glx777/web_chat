import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
} from "typeorm"

@Entity("messages")
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar" })
  message: string

  @Column({ type: "varchar" })
  from: string

  @Column({ type: "varchar" })
  to: string

  @CreateDateColumn()
  createdAt: Date
}
