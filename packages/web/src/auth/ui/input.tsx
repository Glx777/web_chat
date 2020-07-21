import React, { ReactElement } from "react"
import styled from "styled-components"
import { ErrorMessage, FormikProps } from "formik"

import { t } from "../../i18n/i18n"

import { AuthInput } from "./auth.form"

type Props = FormikProps<AuthInput> & {
  label: string
  name: string
  type: string
  value: string
}

const Container = styled.div`
  min-height: 82px;
  max-height: 82px;
  margin-bottom: 15px;
  width: 100%;
`

const StyledLabel = styled.label`
  align-self: flex-start;
  font-size: 18px;
  font-weight: 300;
`

const StyledInput = styled.input`
  padding: 10px;
  width: fill-available;
  border-radius: 6px;
  border: 1px solid black;
`

const StyledErrorMessage = styled.p`
  font-size: 14px;
  color: red;
  margin-top: 4px;
  margin-bottom: 0;
`

export const Input = ({
  label,
  name,
  handleChange,
  value,
  type,
}: Props): ReactElement => (
  <Container>
    <StyledLabel>{label}</StyledLabel>

    <StyledInput
      type={type}
      name={name}
      onChange={handleChange}
      value={value}
    />

    <StyledErrorMessage>
      <ErrorMessage name={name}>
        {(message: string): ReactElement => <span>{t(message)}</span>}
      </ErrorMessage>
    </StyledErrorMessage>
  </Container>
)
