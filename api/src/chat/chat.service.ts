import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"

import { UserRepository } from "../auth/user.repository"

import { SendMessageDTO } from "./dto/send-message.dto"
import { ChatRepository } from "./chat.repository"
import { GetMessagesInput } from "./types/get-message.input"
import { SendMessageInput } from "./types/send-message.input"

export interface MePayload {
  id: string
  username: string
}

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async sendMessageAsync(input: SendMessageInput): Promise<SendMessageDTO> {
    return await this.chatRepository.sendMessageAsync(input)
  }

  async getMessagesAsync(
    input: GetMessagesInput,
  ): Promise<SendMessageDTO[]> | never {
    const sender = await this.userRepository.findOne({ id: input.from })
    const receiver = await this.userRepository.findOne({ id: input.to })

    if (!sender || !receiver) {
      throw new NotFoundException("One of users has not been found")
    }

    return await this.chatRepository.getMessagesAsync(input)
  }
}
