import React, { ReactElement } from "react"
import styled from "styled-components"
import Cookies from "js-cookie"
import { useRouter } from "next/dist/client/router"

import { t } from "../../i18n/i18n"
import { routes } from "../../routes"

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

export const LogoutButton = (): ReactElement => {
  const router = useRouter()

  const logout = (): void => {
    const token = Cookies.get("token")

    if (token) {
      Cookies.remove("token")
      router.replace(routes.root)
    }
  }

  return <StyledButton onClick={logout}>{t("chat.logout")}</StyledButton>
}
