import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from "@nestjs/websockets"
import { Socket, Server } from "socket.io"
import { Logger } from "@nestjs/common"

import { ChatService } from "./chat.service"
import { SendMessageInput } from "./types/send-message.input"
import { GetMessagesInput } from "./types/get-message.input"

@WebSocketGateway(+process.env.WEBSOCKET_PORT)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}
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
    client: Socket,
    data: SendMessageInput,
  ): Promise<void> {
    const message = await this.chatService.sendMessageAsync(data)

    this.wss.emit("sendMessage", message)
  }

  handleDisconnect(): void {
    this.logger.log("Client disconnected")
  }
}
