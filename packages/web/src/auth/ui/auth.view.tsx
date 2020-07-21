import React, { ReactElement } from "react"
import styled from "styled-components"
import { FormikProps, Form } from "formik"

import { t } from "../../i18n/i18n"

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

enum InputTypes {
  "text" = "text",
  "password" = "password",
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
        return t("auth.signIn")

      case FormTypes.SIGN_UP:
        return t("auth.signUp")
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
    <Form>
      <Container>
        <h1>{getText()}</h1>

        <Input
          label={t("auth.username")}
          name="username"
          type={InputTypes.text}
          value={formikBag.values.username}
          {...formikBag}
        />

        <Input
          label={t("auth.password")}
          name="password"
          type={InputTypes.password}
          value={formikBag.values.password}
          {...formikBag}
        />

        <ButtonsContainer>
          <StyledButton
            type={getButtonType(FormTypes.SIGN_IN)}
            onClick={(): void => getOnClickHandler(FormTypes.SIGN_IN)}
          >
            {t("auth.signIn")}
          </StyledButton>
          <StyledButton
            type={getButtonType(FormTypes.SIGN_UP)}
            onClick={(): void => getOnClickHandler(FormTypes.SIGN_UP)}
          >
            {t("auth.signUp")}
          </StyledButton>
        </ButtonsContainer>
      </Container>
    </Form>
  )
}
