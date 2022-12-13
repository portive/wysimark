import { styled } from "goober"
import { forwardRef } from "react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { ListElement } from ".."

const $UnorderedList = styled("ul", forwardRef)`
  margin: 1em 0 1.25em;
  padding-left: 2em;
  list-style-type: disc;
`

const $OrderedList = styled("ol", forwardRef)`
  margin: 1em 0 1.25em;
  padding-left: 2em;
`

export function List({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<ListElement>) {
  if (element.style === "ordered") {
    return <$OrderedList {...attributes}>{children}</$OrderedList>
  } else if (element.style === "unordered") {
    return <$UnorderedList {...attributes}>{children}</$UnorderedList>
  } else {
    throw new Error(
      `Expected style to be "ordered" or "unordered" but was neither`
    )
  }
}
