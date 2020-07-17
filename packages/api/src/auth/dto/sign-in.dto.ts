import { SignUpDTO } from "./sign-up.dto"

export class SignInDTO {
  me: SignUpDTO
  token: string
}
