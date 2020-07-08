import React, { ReactElement } from "react"
import { Formik, FormikValues } from "formik"

import { toast } from "../core/toast"

import { SignUpView } from "./sign-up.view"

export interface SignUpInput {
  username: string
  password: string
}

const initialValues: SignUpInput = {
  username: "",
  password: "",
}

const handleSubmitAsync = async (values: FormikValues): Promise<void> => {
  try {
    await fetch("http://localhost:5000/auth/signUp", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(values),
    })

    toast.success("Success")
  } catch (error) {
    toast.error(error)
  }
}

export const SignUpForm = (): ReactElement => (
  <Formik
    initialValues={initialValues}
    onSubmit={handleSubmitAsync}
    component={SignUpView}
  />
)
