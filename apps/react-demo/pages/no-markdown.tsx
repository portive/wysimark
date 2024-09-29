import Head from "next/head"
import { useCallback, useState } from "react"

import { Editable, useEditor } from "~/src/entry"

import content from "../content/basic.md"

export default function Page() {
  const [markdown, setMarkdown] = useState(content)

  const editor = useEditor({
    authToken: process.env.NEXT_PUBLIC_PORTIVE_AUTH_TOKEN,
    minHeight: 240,
    maxHeight: 720,
  })

  const getMarkdown = useCallback(() => {
    console.log(editor.getMarkdown())
  }, [editor])

  // const onChangeTextarea = useCallback(
  //   (e: ChangeEvent<HTMLTextAreaElement>) => {
  //     const markdown = e.target.value
  //     setMarkdown(markdown)
  //     editor.setMarkdown(markdown)
  //   },
  //   [editor]
  // )

  const resetMarkdown = useCallback(() => {
    editor.setMarkdown(`# This is a reset with the reset button
    
And this is a paragraph
fdsfs`)
  }, [editor])

  return (
    <div style={{ margin: "2em" }}>
      <Head>
        <link rel="stylesheet" href="/preflight.css" />
      </Head>
      <div className="tabs">
        <a className="active" href="/">
          React Src
        </a>
        <a href="/dist">Dist</a>
        <a href="http://localhost:3733/">Standalone Dist</a>
        <a href="http://localhost:3734/">Vue Src</a>
        <a href="http://localhost:3734/dist">Vue Dist</a>H
      </div>
      <h1>Wysimark React Demo</h1>
      <p>
        <button className="button primary" onClick={getMarkdown}>
          Get Markdown
        </button>
        <button className="button" onClick={resetMarkdown}>
          Set Markdown
        </button>
      </p>
      <div
        style={{
          marginTop: "1em",
          display: "grid",
          gap: "1em",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <div>
          <Editable
            editor={editor}
            value={markdown}
            onChange={setMarkdown}
            placeholder="Enter text here..."
          />
        </div>
      </div>
    </div>
  )
}
