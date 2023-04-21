import "~wysimark/src/setup"

import { RenderLeafProps, Slate } from "slate-react"

import { SinkEditable } from "./SinkEditable"
import { UseWysimarkValue } from "./useWysimark"

function renderLeaf({ children, attributes }: RenderLeafProps) {
  return <span {...attributes}>{children}</span>
}

export { useWysimark } from "./useWysimark"

type ExtraProps = React.TextareaHTMLAttributes<HTMLDivElement>

export function Wysimark({
  wysimark,
  ...extraProps
}: { wysimark: UseWysimarkValue } & ExtraProps) {
  console.log("extraProps", extraProps)
  return (
    <Slate editor={wysimark.editor} value={wysimark.editorInitialValue}>
      <SinkEditable renderLeaf={renderLeaf} {...extraProps} />
    </Slate>
  )
}
