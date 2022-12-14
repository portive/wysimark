import { styled } from "goober"
import { forwardRef } from "react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { ListContentElement } from ".."

const $ListContent = styled("div", forwardRef)`
  &.--debug {
    background: rgba(127, 127, 255, 0.5);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
`

export function ListContent({
  attributes,
  children,
}: ConstrainedRenderElementProps<ListContentElement>) {
  return (
    <$ListContent
      // className="--debug"
      {...attributes}
      data-list-content
    >
      {children}
    </$ListContent>
  )
}
