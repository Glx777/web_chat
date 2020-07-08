import React, { ReactElement } from "react"
import styled from "styled-components"
import { ToastContainer, toast } from "react-toastify"
import "normalize.css"
import "react-toastify/dist/ReactToastify.css"

import { SignUpForm } from "./auth/sign-up.form"

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

export const App = (): ReactElement => (
  <Root>
    <ToastContainer {...toastProps} />
    <SignUpForm />
  </Root>
)
