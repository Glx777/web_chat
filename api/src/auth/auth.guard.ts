import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { ExtractJwt } from "passport-jwt"
import { JwtService } from "@nestjs/jwt"

import { UserRepository } from "./user.repository"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}
  // eslint-disable-next-line no-restricted-syntax
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    const token = jwtFromRequest(request)

    if (!token) {
      return false
    }

    const jwt = this.jwtService.verify(token)

    const user = await this.userRepository.findOne({ id: jwt.sub })

    return !!user
  }
}
