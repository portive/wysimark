import Head from "next/head"
import { useCallback } from "react"
import { useWysimark, Wysimark } from "wysimark/src/entry"

import content from "../content/basic.md"

export default function Page() {
  const wysimark = useWysimark({
    initialValue: content,
    uploadAuthToken: process.env.NEXT_PUBLIC_PORTIVE_AUTH_TOKEN,
  })

  const getValue = useCallback(() => {
    const value = wysimark.getValue()
    console.log(value)
  }, [wysimark])

  const resetValue = useCallback(() => {
    wysimark.resetValue(`# This is a reset with the reset button
    
And this is a paragraph`)
  }, [wysimark])

  console.log(content)

  return (
    <div style={{ maxWidth: 720, margin: "2em auto" }}>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
      </Head>

      <div className="mb-2">
        <button className="btn btn-primary me-1" onClick={getValue}>
          Log Value
        </button>
        <button className="btn btn-primary" onClick={resetValue}>
          Reset Value
        </button>
      </div>
      <Wysimark wysimark={wysimark} />
    </div>
  )
}
