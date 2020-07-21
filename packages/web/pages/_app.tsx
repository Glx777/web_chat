/* eslint-disable filenames/match-regex, no-restricted-syntax */
import React from "react"
import {
  default as NextApp,
  AppProps,
  AppContext,
  AppInitialProps,
} from "next/app"
import { ToastContainer, toast } from "react-toastify"
import { RawIntlProvider } from "react-intl"
import "react-toastify/dist/ReactToastify.css"
import { createGlobalStyle } from "styled-components"
import { normalize } from "styled-normalize"

import { intl } from "../src/i18n/i18n"

export const toastProps = {
  position: toast.POSITION.BOTTOM_RIGHT,
  draggable: true,
  draggablePercent: 25,
}

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    font-size: 16px;
    min-width: 100%;
    height: 100vh;
    background: linear-gradient(to right, #dc2424, #4a569d);
    display: flex;
    justify-content: center;
    align-items: center;
    touch-action: manipulation;
    -webkit-overflow-scrolling: touch;
  }
`

class App extends NextApp<AppProps> {
  static async getInitialProps({
    Component,
    ctx,
  }: AppContext): Promise<AppInitialProps & any> {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return pageProps
  }

  render(): React.ReactElement<AppProps> {
    const { Component, pageProps } = this.props

    return (
      <RawIntlProvider value={intl}>
        <ToastContainer {...toastProps} />
        <Component {...pageProps} />
        <GlobalStyle />
      </RawIntlProvider>
    )
  }
}

export default App
