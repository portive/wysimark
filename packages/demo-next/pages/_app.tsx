import { AppProps } from "next/app"
// import { ModalProvider } from "~/lib/modal"
import React from "react"

const MyApp = function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <ModalProvider>
    <Component {...pageProps} />
    // </ModalProvider>
  )
}

export default MyApp
