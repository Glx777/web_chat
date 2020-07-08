import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from "passport-jwt"
import { InjectRepository } from "@nestjs/typeorm"

import { User } from "./user.entity"
import { UserRepository } from "./user.repository"

interface JwtPayload {
  username: string
  sub: string
  iat: number
  exp: number
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretKey: "secretKey",
    })
  }

  async validate({ sub }: JwtPayload): Promise<User> {
    const user = await this.userRepository.findOne({ id: sub })

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
