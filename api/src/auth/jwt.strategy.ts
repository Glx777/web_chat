import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from "passport-jwt"

import { MeDTO } from "./dto/me.dto"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  // eslint-disable-next-line no-restricted-syntax
  async validate(payload: {
    username: string
    sub: string
    iat: number
    exp: number
  }): Promise<MeDTO> {
    return { id: payload.sub, username: payload.username }
  }
}
