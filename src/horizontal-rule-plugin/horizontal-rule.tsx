import { styled } from "goober"
import { forwardRef } from "react"
import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { HorizontalRuleElement } from "."

const $HorizontalRule = styled("hr", forwardRef)`
  height: 1px;
  background-color: var(--hr-color);
  border: none;
  border-radius: 1px;
  &.--selected {
    outline: 2px solid var(--select-color, blue); /* bg-blue-400 */
  }
`

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
