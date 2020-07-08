import { Injectable, Post } from "@nestjs/common"

import { UserRepository } from "./user.repository"
import { SignInDTO } from "./dto/sign-in.dto"
import { SignUpDTO } from "./dto/sign-up.dto"

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  @Post()
  signIn(input: SignInDTO): Promise<SignInDTO> {
    return this.userRepository.signIn(input)
  }

  @Post()
  signUp(input: SignUpDTO): Promise<SignUpDTO> {
    return this.userRepository.signUp(input)
  }
}
