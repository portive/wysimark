import "./button.css"

import { Editable, useEditor } from "@wysimark/react"
import React, { useState } from "react"

type EditorProps = {
  value: string
}

/**
 * I separated the editor here so that it can be re-rendered when the value
 * changes.
 */
export const InnerEditor = ({ value, ...props }: EditorProps) => {
  const [markdown, setMarkdown] = useState(value)
  const editor = useEditor(props)

  return <Editable editor={editor} value={markdown} onChange={setMarkdown} />
}

/**
 * Primary UI component for user interaction
 */
export const Editor = ({ value = "# Hello World" }: EditorProps) => {
  return <InnerEditor key={value} value={value} />
}
