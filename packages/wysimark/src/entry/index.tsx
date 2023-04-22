import "~wysimark/src/setup"

import { BaseEditor } from "slate"
import { ReactEditor, RenderLeafProps, Slate } from "slate-react"

import { SinkEditable, WysimarkEditor } from "./SinkEditable"

function renderLeaf({ children, attributes }: RenderLeafProps) {
  return <span {...attributes}>{children}</span>
}

export { useEditor } from "./useEditor"

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
