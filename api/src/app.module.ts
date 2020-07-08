import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { AuthModule } from "./auth/auth.module"

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "db",
      port: 5432,
      username: "postgres",
      password: "root",
      database: "postgres",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule { }
