import { useState } from "react"
import { BaseEditor, createEditor, Descendant } from "slate"
import { Editable, ReactEditor, Slate, withReact } from "slate-react"

type CustomElement = { type: "paragraph"; children: CustomText[] }
type CustomText = { text: string }

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const initialValue = [
  { type: "paragraph", children: [{ text: "Hello World" }] },
]

export const MyEditor = () => {
  const [editor] = useState(() => withReact(createEditor()))
  // Render the Slate context.
  return (
    <div>
      <Slate editor={editor} value={initialValue}>
        <Editable />
      </Slate>
    </div>
  )
}
