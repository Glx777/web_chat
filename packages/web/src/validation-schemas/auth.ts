import * as yup from "yup"

export const AuthInputSchema = yup.object().shape({
  username: yup
    .string()
    .ensure()
    .required("general.errors.required")
    .matches(/^\S*$/, "general.errors.spacesForbid"),
  password: yup
    .string()
    .ensure()
    .required("general.errors.required")
    .matches(/^\S*$/, "general.errors.spacesForbid")
    .min(6, "general.errors.passwordIsTooShort")
    .max(18, "general.errors.passwordIsTooLong"),
})
