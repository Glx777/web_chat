import config = require("config")

interface JwtConfig {
  secret: string
}

const jwtSecret = config.get<JwtConfig>("jwt")

export const jwtConfig: JwtConfig = {
  secret: jwtSecret,
}
