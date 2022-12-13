import { styled } from "goober"
import { forwardRef } from "react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { ListElement } from ".."

const $UnorderedList = styled("ul", forwardRef)`
  margin: 1em 0 1.25em;
  padding-left: 2em;
  list-style-type: disc;
  background: rgba(255, 128, 128, 0.5);
`

const $OrderedList = styled("ol", forwardRef)`
  margin: 1em 0 1.25em;
  padding-left: 2em;
  background: rgba(255, 128, 128, 0.5);
`

export function List({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<ListElement>) {
  if (element.style === "ordered") {
    return (
      <$OrderedList {...attributes} data-list data-ordered-list>
        {children}
      </$OrderedList>
    )
  } else if (element.style === "unordered") {
    return (
      <$UnorderedList {...attributes} data-list data-unordered-list>
        {children}
      </$UnorderedList>
    )
  } else {
    throw new Error(
      `Expected style to be "ordered" or "unordered" but was neither`
    )
  }
}
