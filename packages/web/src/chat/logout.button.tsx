import React, { ReactElement } from "react"
import styled from "styled-components"
import Cookies from "js-cookie"

const StyledButton = styled.button`
  padding: 10px 20px;
  background: transparent;
  border: 1px solid red;
  border-radius: 6px;
  cursor: pointer;
  margin-top: auto;
  margin-bottom: 20px;

  &:hover {
    border: 1px solid #39b6f5;
  }
`

const logout = (): void => {
  const token = Cookies.get("token")

  if (token) {
    Cookies.remove("token")
    window.location.reload()
  }
}

export const LogoutButton = (): ReactElement => {
  return <StyledButton onClick={logout}>Logout</StyledButton>
}
