import Document, { Head, Html, Main, NextScript } from "next/document"
import React from "react"

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <style>{`
          body {
            margin: 0px;
          }`}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
