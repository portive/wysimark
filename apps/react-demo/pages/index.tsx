import { useCallback, useState } from "react"

import { Editable, useEditor } from "../../../packages/react/src/entry"
import content from "../content/basic.md"

export default function Page() {
  const [markdown, setMarkdown] = useState(content)

  const editor = useEditor({
    initialMarkdown: content,
    authToken: process.env.NEXT_PUBLIC_PORTIVE_AUTH_TOKEN,
    minHeight: 240,
    maxHeight: 720,
  })

  const getMarkdown = useCallback(() => {
    console.log(editor.getMarkdown())
  }, [editor])

  const resetMarkdown = useCallback(() => {
    editor.resetMarkdown(`# This is a reset with the reset button
    
And this is a paragraph
fdsfs`)
  }, [editor])

  return (
    <div style={{ maxWidth: 720, margin: "2em auto" }}>
      <div className="tabs">
        <a className="active" href="/">
          React Src
        </a>
        <a href="/dist">Dist</a>
        <a href="http://localhost:3733/">Standalone Dist</a>
        <a href="http://localhost:3734/">Vue Src</a>
        <a href="http://localhost:3734/dist">Vue Dist</a>
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
      <Editable
        editor={editor}
        onChange={() => {
          setMarkdown(editor.getMarkdown())
        }}
        placeholder="Enter text here..."
      />
      <textarea
        rows={10}
        value={markdown}
        readOnly
        style={{ marginTop: "1em" }}
      />
    </div>
  )
}
