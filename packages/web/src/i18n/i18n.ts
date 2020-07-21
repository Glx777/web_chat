/* eslint-disable unicorn/no-reduce */
import { createIntl, createIntlCache } from "react-intl"
import isString from "lodash/isString"

import { ru } from "./locales/ru"
import { en } from "./locales/en"

interface NestedMessages {
  [key: string]: string | NestedMessages
}

enum Locales {
  ru = "ru",
  en = "en",
}

const flattenMessages = (
  nestedMessages: NestedMessages,
  prefix = "",
): Record<string, string> =>
  Object.keys(nestedMessages).reduce(
    (
      accumulator: Record<string, string>,
      key: string,
    ): Record<string, string> => {
      const value = nestedMessages[`${key}`]
      const prefixedKey = prefix ? `${prefix}.${key}` : key

      if (isString(value)) {
        accumulator[`${prefixedKey}`] = value
      } else {
        Object.assign(accumulator, flattenMessages(value, prefixedKey))
      }

      return accumulator
    },
    {},
  )

const cache = createIntlCache()

const messages: { [key: string]: Record<string, string> } = {
  en: flattenMessages(en),
  ru: flattenMessages(ru),
}

export const intl = createIntl(
  {
    defaultLocale: "en",
    locale: Locales.en,
    messages: messages[Locales.en],
  },
  cache,
)

export const t = (id: string, values = {}): string =>
  intl.formatMessage({ id }, values)
