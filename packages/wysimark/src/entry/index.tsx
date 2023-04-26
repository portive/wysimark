import { BaseEditor } from "slate"
import { ReactEditor, RenderLeafProps, Slate } from "slate-react"

import { SinkEditable } from "./SinkEditable"
import { WysimarkEditor } from "./types"

export type { Element, Text } from "./plugins"
export { useEditor } from "./useEditor"

function renderLeaf({ children, attributes }: RenderLeafProps) {
  return <span {...attributes}>{children}</span>
}

type ExtraProps = React.TextareaHTMLAttributes<HTMLDivElement>

export function Editable({
  editor,
  ...extraProps
}: {
  editor: BaseEditor & ReactEditor & WysimarkEditor
} & ExtraProps) {
  return (
    <Slate editor={editor} value={editor.wysimark.initialValue}>
      <SinkEditable renderLeaf={renderLeaf} {...extraProps} />
    </Slate>
  )
}
