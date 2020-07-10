import React, { ReactElement, ReactNode } from "react"
import styled from "styled-components"

interface Props {
  children: ReactNode
}

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

export const ChatContainer = ({ children }: Props): ReactElement => (
  <Container>{children}</Container>
)
