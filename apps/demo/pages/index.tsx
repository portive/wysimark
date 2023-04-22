import { useEditor, Wysimark } from "@wysimark/react/src/entry"
import { useCallback } from "react"

import content from "../content/basic.md"

export default function Page() {
  const editor = useEditor({
    initialValue: content,
    uploadAuthToken: process.env.NEXT_PUBLIC_PORTIVE_AUTH_TOKEN,
  })

  const getValue = useCallback(() => {
    const value = editor.getValue()
    console.log(value)
  }, [editor])

  const resetValue = useCallback(() => {
    editor.resetValue(`# This is a reset with the reset button
    
And this is a paragraph`)
  }, [editor])

  return (
    <div style={{ maxWidth: 720, margin: "2em auto" }}>
      <div className="mb-2">
        <button className="btn btn-primary me-1" onClick={getValue}>
          Log Value
        </button>
        <button className="btn btn-primary" onClick={resetValue}>
          Reset Value
        </button>
      </div>
      <Wysimark wysimark={editor} />
    </div>
  )
}
