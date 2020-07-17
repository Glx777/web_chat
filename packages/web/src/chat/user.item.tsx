import React, { ReactElement, Dispatch, SetStateAction } from "react"
import styled from "styled-components"

import { User } from "../hooks/use-auth"

interface ListItemProps {
  isSelected?: boolean
}

type Props = ListItemProps & {
  user: User
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>
}

const ListItem = styled.li<ListItemProps>`
  list-style-type: none;
  font-size: 18px;
  padding: 15px;
  border-top: 1px solid #39b6f5;
  border-bottom: 1px solid #39b6f5;
  margin-bottom: 5px;
  background: ${(p): string => (p.isSelected ? "#39b6f5" : "white")};
  color: ${(p): string => (p.isSelected ? "white" : "black")};
  user-select: none;

  &:first-child {
    border-top: 0;
  }

  &:last-child {
    border-bottom: 0;
    margin-bottom: 0;
  }

  &:hover {
    background: #39b6f5;
    cursor: ${(p): string => (p.isSelected ? "default" : "pointer")};
    color: white;
  }
`

export const UserItem = ({
  user,
  setSelectedUser,
  isSelected,
}: Props): ReactElement => (
  <ListItem
    isSelected={isSelected}
    onClick={(): void => (!isSelected ? setSelectedUser(user) : undefined)}
  >
    {user.username}
  </ListItem>
)
