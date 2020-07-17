import React, { ReactElement } from "react"
import styled from "styled-components"
import { Form, Formik, FormikProps, FormikHelpers } from "formik"

interface Props {
  from: string
  to: string
  sendMessage: any
}

interface ChatInput {
  text: string
}

const Container = styled(Form)`
  width: fill-available;
  min-height: 50px;
  max-height: 50px;
  display: flex;
  margin: auto 5px 2px;
`
const StyledInput = styled.input`
  border-radius: 6px;
  width: fill-available;
  padding: 0 10px;
  border: 1px solid #39b6f5;
  font-size: 18px;
`

const SendButton = styled.button`
  margin-left: 5px;
  cursor: pointer;
  border: 1px solid #39b6f5;
  background: transparent;
  border-radius: 6px;
  padding: 0 20px;
  color: #39b6f5;

  &:hover {
    color: #0000ff;
    border-color: #0000ff;
  }
`

const initialValues: ChatInput = {
  text: "",
}

export const ChatControls = ({
  from,
  to,
  sendMessage,
}: Props): ReactElement => {
  const handleSubmit = (
    values: ChatInput,
    formikHelpers: FormikHelpers<ChatInput>,
  ): void => {
    sendMessage({ from, to, message: values.text })
    formikHelpers.resetForm()
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      component={(formikBag: FormikProps<ChatInput>): ReactElement => (
        <Container translate={{}}>
          <StyledInput
            name="text"
            value={formikBag.values.text}
            onChange={formikBag.handleChange}
          />

          <SendButton type="submit">Send</SendButton>
        </Container>
      )}
    />
  )
}
