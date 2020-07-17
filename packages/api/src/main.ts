import { NestFactory } from "@nestjs/core"

import { AppModule } from "./app.module"

async function bootstrapAsync() {
  const app = await NestFactory.create(AppModule, { cors: true })
  await app.listen(5000)
}
bootstrapAsync()
