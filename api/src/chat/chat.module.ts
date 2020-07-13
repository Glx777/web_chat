import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from "@nestjs/config"
import { JwtModule } from "@nestjs/jwt"

import { User } from "../auth/user.entity"
import { UserRepository } from "../auth/user.repository"
import { AuthModule } from "../auth/auth.module"

import { ChatGateway } from "./chat.gateway"
import { ChatService } from "./chat.service"
import { ChatRepository } from "./chat.repository"
import { Message } from "./message.entity"

@Module({
  providers: [ChatGateway, ChatService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: "1d",
      },
    }),
    TypeOrmModule.forFeature([Message, ChatRepository]),
    TypeOrmModule.forFeature([User, UserRepository]),
    AuthModule,
  ],
})
export class ChatModule {}
