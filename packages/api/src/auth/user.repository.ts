import { EntityRepository, Repository } from "typeorm"
import { ConflictException } from "@nestjs/common"
import * as bcrypt from "bcrypt"

import { User } from "./user.entity"
import { SignUpDTO } from "./dto/sign-up.dto"

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUpAsync(signUpDTO: SignUpDTO): Promise<SignUpDTO> | never {
    const user = await this.findOne({ username: signUpDTO.username })

    if (user) {
      throw new ConflictException("Username have already been taken")
    }

    signUpDTO.password = await this.hashPasswordAsync(signUpDTO.password)

    return await this.save(signUpDTO)
  }

  async hashPasswordAsync(password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
  }
}
