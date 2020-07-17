import React, { ReactElement } from "react"
import styled from "styled-components"
import { ToastContainer, toast } from "react-toastify"
import "normalize.css"
import "react-toastify/dist/ReactToastify.css"

import { AuthForm } from "./auth/auth.form"
import { Chat } from "./chat/chat"
import { useAuth } from "./hooks/use-auth"

const Root = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(to right, #dc2424, #4a569d);
  display: flex;
  justify-content: center;
  align-items: center;
`

const toastProps = {
  position: toast.POSITION.BOTTOM_RIGHT,
  draggable: true,
  draggablePercent: 25,
}

export const App = (): ReactElement => {
  const user = useAuth()

  return (
    <Root>
      <ToastContainer {...toastProps} />
      {user ? <Chat /> : <AuthForm />}
    </Root>
  )
}
