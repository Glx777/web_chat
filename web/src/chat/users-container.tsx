import React, { ReactElement, Dispatch, SetStateAction } from "react"
import styled from "styled-components"

import { useAuth, User } from "../hooks/use-auth"

import { UserItem } from "./user.item"
import { LogoutButton } from "./logout.button"

interface Props {
  users?: User[]
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>
  selectedUser?: User
}

const Container = styled.div`
  min-width: 25%;
  max-width: 25%;
  min-height: 100%;
  max-height: 100%;
  border-right: 1px solid #39b6f5;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const UsersList = styled.div`
  width: 100%;
  margin-bottom: 15px;
  overflow-y: auto;
  border-top: 1px solid #39b6f5;
  border-bottom: 1px solid #39b6f5;
`

export const UsersContainer = ({
  users,
  setSelectedUser,
  selectedUser,
}: Props): ReactElement => {
  const currentUser = useAuth()

  return (
    <Container>
      <h1>Users</h1>
      <UsersList>
        {users &&
          currentUser &&
          users
            .filter((user): boolean => user.id !== currentUser.id)
            .map(
              (user: User): ReactElement => {
                const isSelected =
                  user &&
                  selectedUser &&
                  user.username === selectedUser.username

                return (
                  <UserItem
                    key={user.id}
                    user={user}
                    setSelectedUser={setSelectedUser}
                    isSelected={isSelected}
                  />
                )
              },
            )}
      </UsersList>

      <LogoutButton />
    </Container>
  )
}
