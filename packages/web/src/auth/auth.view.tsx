import React, { ReactElement } from "react"
import styled from "styled-components"
import { FormikProps, Form } from "formik"

import { AuthInput, FormTypes } from "./auth.form"
import { Input } from "./input"

type Props = FormikProps<AuthInput> & {
  activeForm: FormTypes
  handleFormSwitch: (formType: FormTypes, resetForm: () => void) => void
}

enum ButtonTypes {
  "button" = "button",
  "submit" = "submit",
  "reset" = "reset",
}

const Container = styled.div`
  width: 300px;
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
`

const StyledButton = styled.button`
  border-radius: 6px;
  background: transparent;
  padding: 10px 20px;
  border-color: #dc2424;
  font-size: 18px;
  cursor: pointer;
`

const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`

export const AuthView = ({
  activeForm,
  handleFormSwitch,
  ...formikBag
}: Props): ReactElement => {
  const getText = (): string => {
    switch (activeForm) {
      case FormTypes.SIGN_IN:
        return "Sign in"
      case FormTypes.SIGN_UP:
        return "Sign up"
    }
  }

  const getButtonType = (type: FormTypes): ButtonTypes => {
    if (type === activeForm) {
      return ButtonTypes.submit
    }

    return ButtonTypes.button
  }

  const getOnClickHandler = (formType: FormTypes): void => {
    if (activeForm !== formType) {
      handleFormSwitch(FormTypes[formType], formikBag.resetForm)
    }
  }

  return (
    <Form translate={{}}>
      <Container>
        <h1>{getText()}</h1>

        <Input
          label="Username"
          name="username"
          type="text"
          value={formikBag.values.username}
          {...formikBag}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={formikBag.values.password}
          {...formikBag}
        />

        <ButtonsContainer>
          <StyledButton
            type={getButtonType(FormTypes.SIGN_IN)}
            onClick={(): void => getOnClickHandler(FormTypes.SIGN_IN)}
          >
            Sign in
          </StyledButton>
          <StyledButton
            type={getButtonType(FormTypes.SIGN_UP)}
            onClick={(): void => getOnClickHandler(FormTypes.SIGN_UP)}
          >
            Sign up
          </StyledButton>
        </ButtonsContainer>
      </Container>
    </Form>
  )
}
