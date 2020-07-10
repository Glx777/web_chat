import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { JwtModule } from "@nestjs/jwt"

import { AuthService } from "../auth/auth.service"
import { User } from "../auth/user.entity"
import { UserRepository } from "../auth/user.repository"

import { ChatGateway } from "./chat.gateway"
import { ChatService } from "./chat.service"
import { ChatRepository } from "./chat.repository"
import { Message } from "./message.entity"

@Module({
  providers: [ChatGateway, ChatService, AuthService],
  imports: [
    TypeOrmModule.forFeature([Message, ChatRepository]),
    TypeOrmModule.forFeature([User, UserRepository]),
    JwtModule.register({
      secret: "sfsdfsfdf",
      signOptions: {
        expiresIn: "1d",
      },
    }),
  ],
})
export class ChatModule {}
