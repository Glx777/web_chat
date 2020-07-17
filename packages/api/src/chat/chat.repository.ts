import { EntityRepository, Repository } from "typeorm"

import { Message } from "./message.entity"
import { SendMessageDTO } from "./dto/send-message.dto"
import { SendMessageInput } from "./types/send-message.input"
import { GetMessagesInput } from "./types/get-message.input"

@EntityRepository(Message)
export class ChatRepository extends Repository<Message> {
  async sendMessageAsync(
    sendMessageDTO: SendMessageInput,
  ): Promise<SendMessageDTO> {
     return await this.save(sendMessageDTO)
  }

  async getMessagesAsync(input: GetMessagesInput): Promise<SendMessageDTO[]> {
    const messages = await this.createQueryBuilder("messages")
      .where("messages.from = :from AND messages.to = :to", {
        from: input.from,
        to: input.to,
      })
      .orWhere("messages.to = :from AND messages.from = :to", {
        from: input.from,
        to: input.to,
      })
      .getMany()

    return messages
  }
}
