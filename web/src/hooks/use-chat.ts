import { useState, useRef, useEffect } from "react"
import socketIOClient, { Socket } from "socket.io-client"
import Cookies from "js-cookie"

import { useAuth } from "./use-auth"

type Payload = [
  any[],
  (input: SendMessageInput) => void,
  (input: GetMessagesInput) => void,
]

interface GetMessagesInput {
  from: string
  to: string
}

type SendMessageInput = GetMessagesInput & {
  message: string
}

const token = Cookies.get("token")

export const useChat = (): Payload => {
  const [user, setUser] = useState<any>()
  const [messages, setMessages] = useState<any[]>([])
  const socketReference = useRef<typeof Socket>()

  const getUserAsync = async (): Promise<void> => {
    const response = await fetch(`http://localhost:5000/auth/me`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })

    const user = await response.json()

    setUser({
      id: user.id,
      username: user.username,
    })
  }

  useEffect((): (() => void) => {
    token && getUserAsync()

    socketReference.current = socketIOClient("http://localhost:4000", {
      query: { token },
    })
    socketReference.current.on("connection", (data: string): void =>
      console.log(data),
    )

    if (socketReference.current) {
      socketReference.current.on("getMessages", (newMessages: any): void => {
        setMessages([])
        console.log(":SDKLFJ", user)
        setMessages((messages) => [
          ...messages,
          ...newMessages.filter((newMessage: any): boolean => {
            if (
              newMessage.to !== (user && user.id) ||
              newMessage.from !== (user && user.id)
            ) {
              return false
            }

            return true
          }),
        ])
      })

      socketReference.current.on("sendMessage", (newMessage: any): void => {
        setMessages((messages) => [...messages, newMessage])
      })
    }

    return (): void => {
      if (socketReference.current) {
        socketReference.current.disconnect()
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sendMessage = (input: SendMessageInput): void => {
    if (socketReference.current) {
      socketReference.current.emit("sendMessage", input)
    }
  }

  const getMessages = (input: GetMessagesInput): void => {
    if (socketReference.current) {
      socketReference.current.emit("getMessages", input)
    }
  }

  return [messages, sendMessage, getMessages]
}
