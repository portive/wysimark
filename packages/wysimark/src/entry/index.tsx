import "~wysimark/src/setup"

import { Editor } from "slate"
import { RenderLeafProps, Slate } from "slate-react"

import { SinkEditable } from "./SinkEditable"

function renderLeaf({ children, attributes }: RenderLeafProps) {
  return <span {...attributes}>{children}</span>
}

export { useEditor } from "./useEditor"

type ExtraProps = React.TextareaHTMLAttributes<HTMLDivElement>

export function Editable({
  editor,
  ...extraProps
}: { editor: Editor } & ExtraProps) {
  return (
    <Slate editor={editor} value={editor.wysimark.initialValue}>
      <SinkEditable renderLeaf={renderLeaf} {...extraProps} />
    </Slate>
  )
}
