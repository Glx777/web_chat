import React, { ReactElement } from "react"
import styled from "styled-components"

interface Props {
  username: string
  text: string
  id: string
  isSenderMe: boolean
}

interface ListItemProps {
  isSenderMe: boolean
}

const ListItem = styled.li<ListItemProps>`
  list-style-type: none;
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: fit-content;
  align-self: ${(p): string => (p.isSenderMe ? "flex-end" : "flex-start")};
`

const Username = styled.h1`
  margin: 0;
  color: #222;
`

const StyledMessage = styled.p`
  background: #39b6f5;
  border-radius: 6px;
  margin: 0 0 0 10px;
  width: fit-content;
  padding: 10px 20px;
  color: white;
`

export const Message = ({
  username,
  text,
  id,
  isSenderMe,
}: Props): ReactElement => {
  return (
    <ListItem
      isSenderMe={isSenderMe}
      id={id.replace(/-/g, "").replace(/\d/g, "")}
    >
      <Username>{username}</Username>
      <StyledMessage>{text}</StyledMessage>
    </ListItem>
  )
}
