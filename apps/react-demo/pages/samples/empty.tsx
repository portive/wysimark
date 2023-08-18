import { useState } from "react"

import { Editable, useEditor } from "~/src/entry"

import content from "../../content/basic.md"

/**
 * Sample to replicate issue:
 *
 * https://github.com/portive/wysimark/issues/36
 */

export default function Page() {
  const [markdown, setMarkdown] = useState("")

  const editor = useEditor({
    authToken: process.env.NEXT_PUBLIC_PORTIVE_AUTH_TOKEN,
    height: 500,
  })

  return (
    <div style={{ width: 480, margin: "2em auto" }}>
      <div>
        <Editable
          editor={editor}
          value={markdown}
          onChange={setMarkdown}
          placeholder="Enter text here..."
        />
      </div>
    </div>
  )
}
