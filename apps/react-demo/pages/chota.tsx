import Head from "next/head"
import { useCallback, useState } from "react"

import { Editable, useEditor } from "~/src/entry"

export default function ChotaPage() {
  const [markdown, _setMarkdown] = useState(
    "# Heading\n\nHello, world!\n\n- [ ] Checkbox\n\n---\n\n---\n\n"
  )

  const setMarkdown = useCallback(
    (markdown: string) => {
      console.log("setMarkdown", markdown)
      _setMarkdown(markdown)
    },
    [_setMarkdown]
  )

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
        <p style={{marginTop: '2em'}}>
          This page was originally created because the toolbar down arrows were
          being displayed too low when Chota CSS framework was being used.
        </p>
      </div>
    </>
  )
}
