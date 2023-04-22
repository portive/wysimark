import { Editable, useEditor } from "@wysimark/react/src/entry"
import { useCallback } from "react"

import content from "../content/basic.md"

export default function Page() {
  const editor = useEditor({
    initialMarkdown: content,
    uploadAuthToken: process.env.NEXT_PUBLIC_PORTIVE_AUTH_TOKEN,
  })

  const getMarkdown = useCallback(() => {
    console.log(editor.getMarkdown())
  }, [editor])

  const resetMarkdown = useCallback(() => {
    editor.resetMarkdown(`# This is a reset with the reset button
    
And this is a paragraph`)
  }, [editor])

  return (
    <div style={{ maxWidth: 720, margin: "2em auto" }}>
      <div className="mb-2">
        <button className="btn btn-primary me-1" onClick={getMarkdown}>
          Log Value
        </button>
        <button className="btn btn-primary" onClick={resetMarkdown}>
          Reset Value
        </button>
      </div>
      <Editable editor={editor} />
    </div>
  )
}
