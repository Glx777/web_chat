import * as yup from "yup"

export const AuthInputSchema = yup.object().shape({
  username: yup
    .string()
    .ensure()
    .required("Username is required")
    .matches(/^\S*$/, "Spaces are forbidden"),
  password: yup
    .string()
    .ensure()
    .required("Password is required")
    .matches(/^\S*$/, "Spaces are forbidden")
    .min(6, "Password is too short")
    .max(18, "Password is too long"),
})
