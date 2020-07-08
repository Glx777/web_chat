import { EntityRepository, Repository } from "typeorm"

import { User } from "./user.entity"
import { SignInDTO } from "./dto/sign-in.dto"
import { SignUpDTO } from "./dto/sign-up.dto"

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  signIn = async (signInDTO: SignInDTO): Promise<SignInDTO> => {
    return await this.save(signInDTO)
  }

  signUp = async (signUpDTO: SignUpDTO): Promise<SignUpDTO> => {
    return await this.save(signUpDTO)
  }
}
