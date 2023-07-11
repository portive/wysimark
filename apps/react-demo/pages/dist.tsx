import { Editable, useEditor } from "@wysimark/react"
import { useState } from "react"

export default function Page() {
  const [markdown, setMarkdown] = useState("# Hello World")
  const editor = useEditor({
    authToken: process.env.NEXT_PUBLIC_PORTIVE_AUTH_TOKEN,
    minHeight: 240,
    maxHeight: 720,
  })

  return (
    <div style={{ maxWidth: 720, margin: "2em auto" }}>
      <h1>Wysimark</h1>
      <button onClick={() => console.log(editor.getMarkdown())}>Get</button>
      <button onClick={() => editor.setMarkdown("# Reset")}>Reset</button>
      <Editable
        editor={editor}
        value={markdown}
        onChange={setMarkdown}
        style={{ maxHeight: 400 }}
      />
    </div>
  )
}
