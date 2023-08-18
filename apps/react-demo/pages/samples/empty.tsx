import { useState } from "react"

import { Editable, useEditor } from "~/src/entry"

/**
 * Sample to replicate issue:
 *
 * https://github.com/portive/wysimark/issues/36
 */

export default function Page() {
  const [markdown, setMarkdown] = useState(`1. Item 1
2. Item 2
3. Item 3

Paragraph

1. Item 1 again`)

  const editor = useEditor({
    authToken: process.env.NEXT_PUBLIC_PORTIVE_AUTH_TOKEN,
    // minHeight: 200,
    // maxHeight: 500,
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
