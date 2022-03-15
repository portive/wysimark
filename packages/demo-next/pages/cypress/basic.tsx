import React from "react"
import { Wysimark, useEditor } from "~/editor"

const initialMarkdown = `## Title

This is editable **rich** text, _much_ better than a \`<textarea>\`!
`

export default function CypressBasic() {
  const editor = useEditor({ initialMarkdown })
  return (
    <div style={{width: 640}}>
      <Wysimark
        editor={editor}
        data-cy="editor"
        showInitial={true}
        maxHeight={640}
      />
    </div>
  )
}
