import { toast as toastify, TypeOptions, ToastOptions } from "react-toastify"

const makeHandler = (
  type: TypeOptions,
): ((text: string, options?: ToastOptions) => void) => (
  text: string,
  options?: ToastOptions,
): void => {
  toastify(text, {
    type,
    className: `toast-${type}`,
    ...options,
  })
}

export const toast = {
  info: makeHandler("info"),
  error: makeHandler("error"),
  warning: makeHandler("warning"),
  success: makeHandler("success"),
}
