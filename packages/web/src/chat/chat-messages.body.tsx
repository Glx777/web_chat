import React, { ReactElement } from "react"
import styled from "styled-components"

import { ChatMessagesContainer } from "./chat-messages.container"

interface Props {
  selectedUser: { id: string; username: string }
  messages: any
  user: any
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 90%;
`

export const ChatMessagesBody = ({
  selectedUser,
  messages,
  user,
}: Props): ReactElement => (
  <Container>
    <h1>Chatting with {selectedUser.username}</h1>
    <ChatMessagesContainer
      messages={messages}
      user={user}
      selectedUser={selectedUser}
    />
  </Container>
)
