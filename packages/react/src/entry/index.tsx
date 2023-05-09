import { BaseEditor } from "slate"
import { ReactEditor, RenderLeafProps, Slate } from "slate-react"

import { SinkEditable } from "./SinkEditable"
import { WysimarkEditor } from "./types"

export type { Element, Text } from "./plugins"
export { useEditor } from "./useEditor"

function renderLeaf({ children, attributes }: RenderLeafProps) {
  return <span {...attributes}>{children}</span>
}

export type EditableProps = {
  editor: BaseEditor & ReactEditor & WysimarkEditor
  onChange?: () => void
} & Omit<React.TextareaHTMLAttributes<HTMLDivElement>, "onChange">

export function Editable({ editor, onChange, ...extraProps }: EditableProps) {
  return (
    <Slate
      editor={editor}
      value={editor.wysimark.initialValue}
      onChange={onChange}
    >
      <SinkEditable renderLeaf={renderLeaf} {...extraProps} />
    </Slate>
  )
}
