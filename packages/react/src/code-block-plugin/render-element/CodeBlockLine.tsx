import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps } from "../../sink"
import { $CodeBlockLine } from "../styles"
import { CodeBlockLineElement } from "../types"

export function CodeBlockLine({
  attributes,
  children,
}: ConstrainedRenderElementProps<CodeBlockLineElement>) {
  const selected = useSelected()
  return (
    <$CodeBlockLine
      className={selected ? "--selected" : ""}
      {...attributes}
      spellCheck="false"
    >
      {children}
    </$CodeBlockLine>
  )
}
