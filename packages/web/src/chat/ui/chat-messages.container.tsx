import React, { ReactElement } from "react"
import styled from "styled-components"

import { Message } from "./message"

interface Props {
  messages: any
  user: any
  selectedUser: any
}

const Container = styled.div`
  width: fill-available;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 0 20px;
`

export const ChatMessagesContainer = ({
  messages,
  user,
  selectedUser,
}: Props): ReactElement => (
  <Container>
    {messages
      .filter((message: any): boolean => {
        if (message.from !== selectedUser.id && message.from !== user.id) {
          return false
        }

        return true
      })
      .map(
        (message: any): ReactElement => {
          const getSender = (): string => {
            switch (message.from) {
              case selectedUser.id:
                return selectedUser.username

              case user.id:
                return user.username

              default:
                return ""
            }
          }

          const isSenderMe = getSender() === user.username

          return (
            <Message
              id={message.id}
              key={message.id}
              text={message.message}
              username={getSender()}
              isSenderMe={isSenderMe}
            />
          )
        },
      )}
  </Container>
)
