import React, { ReactElement, useState, useEffect, Fragment } from "react"
import styled from "styled-components"
import Cookies from "js-cookie"

import { toast } from "../core/toast"
import { useAuth, User } from "../hooks/use-auth"
import { useChat } from "../hooks/use-chat"

import { UsersContainer } from "./users-container"
import { ChatContainer } from "./chat-container"
import { ChatControls } from "./chat-controls"
import { ChatMessagesBody } from "./chat-messages.body"

const Container = styled.div`
  min-width: 80%;
  max-width: 80%;
  min-height: 80vh;
  max-height: 80vh;
  background: white;
  border-radius: 6px;
  display: flex;
`
const token = Cookies.get("token")

export const Chat = (): ReactElement => {
  const [users, setUsers] = useState<User[]>()
  const [selectedUser, setSelectedUser] = useState<User>()
  const user = useAuth()
  const [messages, sendMessage, getMessages] = useChat()

  const getUsersAsync = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:5000/auth/users", {
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

      const users = await response.json()

      setUsers(users)
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect((): void => {
    getUsersAsync()
  }, [])

  useEffect((): void => {
    if (user && selectedUser) {
      getMessages({ from: user.id, to: selectedUser.id })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, selectedUser])

  useEffect((): void => {
    const lastMessage =
      messages.length > 0
        ? document.querySelector(
            `#${messages[messages.length - 1].id
              .replace(/-/g, "")
              .replace(/\d/g, "")}`,
          )
        : undefined

    lastMessage && lastMessage.scrollIntoView()
  }, [messages])

  return (
    <Container>
      <UsersContainer
        users={users}
        setSelectedUser={setSelectedUser}
        selectedUser={selectedUser}
      />

      <ChatContainer>
        {selectedUser && user && (
          <Fragment>
            <ChatMessagesBody
              selectedUser={selectedUser}
              messages={messages}
              user={user}
            />

            <ChatControls
              from={user.id}
              to={selectedUser.id}
              sendMessage={sendMessage}
            />
          </Fragment>
        )}
      </ChatContainer>
    </Container>
  )
}
