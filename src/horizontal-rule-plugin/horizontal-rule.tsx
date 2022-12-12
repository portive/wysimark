import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { HorizontalRuleElement } from "."

export function HorizontalRule({
  attributes,
  children,
}: ConstrainedRenderElementProps<HorizontalRuleElement>) {
  const selected = useSelected()
  return (
    <div
      {...attributes}
      style={{ outline: selected ? "2px solid royalblue" : "none" }}
    >
      {children}
      <div contentEditable={false}>
        <hr />
      </div>
    </div>
  )
}
