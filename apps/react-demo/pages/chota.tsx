import Head from "next/head"
import { useState } from "react"

import { Editable, useEditor } from "~/src/entry"

export default function ChotaPage() {
  const [markdown, setMarkdown] = useState("# Heading\n\nHello, world!")

  const editor = useEditor({
    authToken: process.env.NEXT_PUBLIC_PORTIVE_AUTH_TOKEN,
    minHeight: 240,
    maxHeight: 720,
  })
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/chota@latest" />
      </Head>
      <div style={{ maxWidth: 720, margin: "4em auto" }}>
        <Editable
          editor={editor}
          value={markdown}
          onChange={setMarkdown}
          placeholder="Enter text here..."
        />
      </div>
    </>
  )
}
