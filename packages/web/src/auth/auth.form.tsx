import React, { ReactElement, useState } from "react"
import { Formik, FormikValues, FormikProps, FormikHelpers } from "formik"
import Cookies from "js-cookie"

import { AuthInputSchema } from "../validation-schemas/auth"
import { toast } from "../core/toast"
import { t } from "../i18n/i18n"

import { AuthView } from "./auth.view"

export interface AuthInput {
  username: string
  password: string
}

export enum FormTypes {
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
}

const initialValues: AuthInput = {
  username: "",
  password: "",
}

const signInAsync = async (values: FormikValues): Promise<void> => {
  try {
    const response = await fetch("http://localhost:5000/auth/signIn", {
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

    const data = await response.json()

    if (data.token) {
      Cookies.set("token", data.token)
      toast.success(t("general.success"))
      window.location.reload()
    }
  } catch (error) {
    toast.error(error)
  }
}

export const AuthForm = (): ReactElement => {
  const [activeForm, setActiveForm] = useState<FormTypes>(FormTypes.SIGN_IN)

  const handleFormSwitch = (
    formType: FormTypes,
    resetForm: () => void,
  ): void => {
    resetForm()
    setActiveForm(formType)
  }

  const signUpAsync = async (
    values: FormikValues,
    { resetForm }: FormikHelpers<AuthInput>,
  ): Promise<void> => {
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

      toast.success(t("general.success"))
      handleFormSwitch(FormTypes.SIGN_IN, resetForm)
    } catch (error) {
      toast.error(error)
    }
  }

  const getSubmitFunction = ():
    | ((values: FormikValues) => Promise<void>)
    | ((
        values: FormikValues,
        { resetForm }: FormikHelpers<AuthInput>,
      ) => Promise<void>) => {
    switch (activeForm) {
      case FormTypes.SIGN_IN:
        return signInAsync
      case FormTypes.SIGN_UP:
        return signUpAsync
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AuthInputSchema}
      onSubmit={getSubmitFunction()}
      validateOnChange={false}
      validateOnBlur={false}
      component={(formikBag: FormikProps<AuthInput>): ReactElement => (
        <AuthView
          activeForm={activeForm}
          handleFormSwitch={handleFormSwitch}
          {...formikBag}
        />
      )}
    />
  )
}
