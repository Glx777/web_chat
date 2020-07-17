import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcryptjs"
import { Request } from "express"

import { UserRepository } from "./user.repository"
import { SignInDTO } from "./dto/sign-in.dto"
import { SignUpDTO } from "./dto/sign-up.dto"
import { MeDTO } from "./dto/me.dto"

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async meAsync(request: Request): Promise<MeDTO> {
    return request.user as MeDTO
  }

  async getUsersAsync(): Promise<MeDTO[]> {
    const users = await this.userRepository.createQueryBuilder().getMany()

    return users.map(
      (user): MeDTO => ({
        id: user.id,
        username: user.username,
      }),
    )
  }

  async signInAsync(input: SignUpDTO): Promise<SignInDTO> | never {
    const user = await this.userRepository.findOne({
      username: input.username,
    })

    if (user) {
      const isSamePassword = await this.comparePasswordsAsync(
        input.password,
        user.password,
      )

      if (isSamePassword) {
        const signInDTO = new SignInDTO()
        signInDTO.me = user

        const payload = {
          username: user.username,
          sub: user.id,
        }

        signInDTO.token = await this.jwtService.signAsync(payload)

        return signInDTO
      }
    }
  }

  async signUpAsync(input: SignUpDTO): Promise<SignUpDTO> | never {
    return this.userRepository.signUpAsync(input)
  }

  async comparePasswordsAsync(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
  }
}
