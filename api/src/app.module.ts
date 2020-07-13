import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from "@nestjs/config"

import { AuthModule } from "./auth/auth.module"
import { ChatModule } from "./chat/chat.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.NODE_ENV === "production" ? "db" : "localhost",
      port: 5432,
      username: "postgres",
      password: "root",
      database: "postgres",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    AuthModule,
    ChatModule,
  ],
})
export class AppModule {}
