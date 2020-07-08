import { Controller, Post, Body } from "@nestjs/common"

import { AuthService } from "./auth.service"
import { SignInDTO } from "./dto/sign-in.dto"
import { SignUpDTO } from "./dto/sign-up.dto"

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signIn")
  signIn(input: SignInDTO): Promise<SignInDTO> {
    return this.authService.signIn(input)
  }

  @Post("signUp")
  signUp(@Body() input: SignUpDTO): Promise<SignUpDTO> {
    return this.authService.signUp(input)
  }
}
