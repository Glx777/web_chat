import { Controller, Post, Body, Get, Req, UseGuards } from "@nestjs/common"
import { Request } from "express"

import { AuthService } from "./auth.service"
import { SignInDTO } from "./dto/sign-in.dto"
import { SignUpDTO } from "./dto/sign-up.dto"
import { SignUpInput } from "./types/sign-up.input"
import { SignInInput } from "./types/sign-in.input"
import { MeDTO } from "./dto/me.dto"
import { JwtAuthGuard } from "./auth.guard"

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get("me")
  me(@Req() request: Request): Promise<MeDTO> {
    return this.authService.meAsync(request)
  }

  @UseGuards(JwtAuthGuard)
  @Get("users")
  getUsers(): Promise<MeDTO[]> {
    return this.authService.getUsersAsync()
  }

  @Post("signIn")
  signIn(@Body() input: SignInInput): Promise<SignInDTO> | never {
    return this.authService.signInAsync(input)
  }

  @Post("signUp")
  signUp(@Body() input: SignUpInput): Promise<SignUpDTO> | never {
    return this.authService.signUpAsync(input)
  }
}
