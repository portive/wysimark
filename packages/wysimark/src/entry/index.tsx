import "wysimark/src/setup"

import { RenderLeafProps, Slate } from "slate-react"

import { SinkEditable } from "./SinkEditable"
import { UseWysimarkValue } from "./useWysimark"

function renderLeaf({ children, attributes }: RenderLeafProps) {
  return <span {...attributes}>{children}</span>
}

export { useWysimark } from "./useWysimark"

export function Wysimark({ wysimark }: { wysimark: UseWysimarkValue }) {
  return (
    <Slate editor={wysimark.editor} value={wysimark.editorInitialValue}>
      <SinkEditable renderLeaf={renderLeaf} />
    </Slate>
  )
}
