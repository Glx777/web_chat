import React, { ReactElement } from "react"
import { Formik, FormikValues } from "formik"

import { SignInView } from "./sign-in.view"

export interface SignInInput {
  username: string
  password: string
}

const initialValues: SignInInput = {
  username: "",
  password: "",
}

const handleSubmitAsync = async (values: FormikValues): Promise<void> => {
  try {
    const response = await fetch("http://localhost:5000/auth/signIn", {
      method: "POST",
      body: JSON.stringify(values),
      cache: "no-cache",
      mode: "cors",
    })

    console.log(JSON.stringify(response))
  } catch (error) {
    console.log(error)
  }
}

export const SignInForm = (): ReactElement => (
  <Formik
    initialValues={initialValues}
    onSubmit={handleSubmitAsync}
    component={SignInView}
  />
)
