// pages/_document.js

import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        {/* <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          crossOrigin="anonymous"
        /> */}
        {/* https://github.com/tailwindlabs/tailwindcss/blob/master/src/css/preflight.css */}
        <link rel="stylesheet" href="/preflight.css" />
        {/* <link rel="stylesheet" href="https://unpkg.com/chota@latest" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
