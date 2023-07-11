import styled from "@emotion/styled"
import { ChangeEvent, useCallback, useState } from "react"

import { Editable, useEditor } from "../../../packages/react/src/entry"
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

  const onChangeTextarea = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const markdown = e.target.value
      setMarkdown(markdown)
      editor.setMarkdown(markdown)
    },
    [editor]
  )

  const resetMarkdown = useCallback(() => {
    editor.setMarkdown(`# This is a reset with the reset button
    
And this is a paragraph
fdsfs`)
  }, [editor])

  return (
    <div style={{ margin: "2em" }}>
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
            onChange={(markdown) => {
              setMarkdown(markdown)
            }}
            placeholder="Enter text here..."
          />
        </div>
        <div>
          <$Textarea value={markdown} onChange={onChangeTextarea} />
        </div>
      </div>
    </div>
  )
}

const $Textarea = styled.textarea`
  width: 100%;
  height: 720px;
  background: #011627;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  color: #d6deeb;
  padding: 20px;
  font-size: 13px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  /* font-family: "Consolas", "Monaco", "Courier New", monospace; */

  &:hover {
    outline: 2px solid #bfdbfe;
  }
`
