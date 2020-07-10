import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { JwtModule } from "@nestjs/jwt"

import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { User } from "./user.entity"
import { UserRepository } from "./user.repository"

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository]),
    JwtModule.register({
      secret: "sfsdfsfdf",
      signOptions: {
        expiresIn: "1d",
      },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
