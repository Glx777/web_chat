import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from "@nestjs/websockets"
import { Socket, Server } from "socket.io"
import { Logger } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"

import { UserRepository } from "../auth/user.repository"

import { ChatService } from "./chat.service"
import { SendMessageInput } from "./types/send-message.input"
import { GetMessagesInput } from "./types/get-message.input"

const PORT = 4000

@WebSocketGateway(PORT)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private chatService: ChatService,
    @InjectRepository(UserRepository)
    private _userRepository: UserRepository,
  ) {}
  @WebSocketServer() wss: Server

  private logger: Logger = new Logger()

  handleConnection(client: Socket): void {
    this.logger.log("New client connected")
    client.emit("connection", "Successfully connected to server")
  }

  @SubscribeMessage("getMessages")
  async getMessagesAsync(
    client: Socket,
    data: GetMessagesInput,
  ): Promise<void> {
    const messages = await this.chatService.getMessagesAsync(data)

    client.emit("getMessages", messages)
  }

  @SubscribeMessage("sendMessage")
  async sendMessageAsync(
    _client: Socket,
    data: SendMessageInput,
  ): Promise<void> {
    const message = await this.chatService.sendMessageAsync(data)

    this.wss.emit("sendMessage", message)
  }

  handleDisconnect(): void {
    this.logger.log("Client disconnected")
  }
}
