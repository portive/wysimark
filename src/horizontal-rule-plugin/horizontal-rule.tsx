import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { HorizontalRuleElement } from "."
import { $HorizontalRule } from "./styles"

export function HorizontalRule({
  attributes,
  children,
}: ConstrainedRenderElementProps<HorizontalRuleElement>) {
  const selected = useSelected()
  return (
    <div {...attributes}>
      {children}
      <div contentEditable={false}>
        <$HorizontalRule className={selected ? "--selected" : ""} />
      </div>
    </div>
  )
}
