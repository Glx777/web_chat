import {createIntl, createIntlCache} from "react-intl"
import isString from "lodash/isString"

import { ru } from "./locales/ru"
import { en } from "./locales/en"

interface NestedMessages {
    [key: string]: string | NestedMessages
  }

const flattenMessages = (
    nestedMessages: NestedMessages,
    prefix: string = "",
  ): Record<string, string> =>
    Object.keys(nestedMessages).reduce(
      (acc: Record<string, string>, key: string): Record<string, string> => {
        const value = nestedMessages[`${key}`]
        const prefixedKey = prefix ? `${prefix}.${key}` : key
  
        if (isString(value)) {
          acc[`${prefixedKey}`] = value
        } else {
          Object.assign(acc, flattenMessages(value, prefixedKey))
        }
  
        return acc
      },
      {},
    )

const cache = createIntlCache()

const locale = "ru"

const messages: { [key: string]: Record<string, string> } = {
  en: flattenMessages(en),
  ru: flattenMessages(ru),
}

export const intl = createIntl({
    locale,
    messages: messages[locale],
}, cache)

export const t = (id: string, values = {}): string => intl.formatMessage({id}, values)