/* eslint-disable filenames/match-regex, no-restricted-syntax */
import React, { Fragment, ReactElement } from "react"
import {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentProps,
  DocumentInitialProps,
  default as NextDocument,
} from "next/document"
import { ServerStyleSheet } from "styled-components"

class Document extends NextDocument<DocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await NextDocument.getInitialProps(ctx)

      return {
        ...initialProps,

        styles: ((
          <Fragment>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </Fragment>
        ) as unknown) as ReactElement<unknown>[],
      }
    } finally {
      sheet.seal()
    }
  }

  render(): React.ReactElement {
    return (
      <Html>
        <Head />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
