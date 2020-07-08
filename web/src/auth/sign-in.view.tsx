import React, { ReactElement } from "react"
import styled from "styled-components"
import { FormikProps, Form } from "formik"

import { SignInInput } from "./sign-in.form"

const Container = styled.div`
  width: 300px;
  height: 300px;
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
`

const StyledLabel = styled.label`
  align-self: flex-start;
  font-size: 18px;
  font-weight: 300;
`

const StyledInput = styled.input`
  padding: 10px;
  width: fill-available;
  margin-bottom: 20px;
`

const StyledButton = styled.button`
  border-radius: 6px;
  background: transparent;
  padding: 10px 20px;
  border-color: #dc2424;
  font-size: 18px;
  cursor: pointer;
`

export const SignInView = ({
  values,
  handleChange,
}: FormikProps<SignInInput>): ReactElement => (
  <Form translate={{}}>
    <Container>
      <h1>Sign up</h1>

      <StyledLabel>Username</StyledLabel>

      <StyledInput
        type="text"
        name="username"
        onChange={handleChange}
        value={values.username}
      />

      <StyledLabel>Password</StyledLabel>

      <StyledInput
        type="password"
        name="password"
        onChange={handleChange}
        value={values.password}
      />

      <StyledButton type="submit">Sign up</StyledButton>
    </Container>
  </Form>
)
