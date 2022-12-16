import { styled } from "goober"
import { forwardRef } from "react"
import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { HorizontalRuleElement } from "."

const $HorizontalRule = styled("hr", forwardRef)`
  position: relative;
  height: 1em;
  /* background-color: var(--hr-color); */
  margin: 1em 0;
  &::before {
    position: absolute;
    content: "";
    left: 0.125em;
    right: 0.125em;
    top: 50%;
    height: 1px;
    background-color: var(--hr-color);
    border-radius: 1px;
  }
  border-radius: 0.25em;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: rgba(0, 127, 255, 0.1);
    /* &::before {
      outline: 2px solid var(--hover-color);
    } */
  }
  &.--selected {
    background: none;
    &::before {
      outline: 2px solid var(--select-color, blue);
    }
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
