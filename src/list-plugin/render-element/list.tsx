import { styled } from "goober"
import { forwardRef } from "react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { ListElement } from ".."
import { isDebug } from "./debug"

const $List = styled("ol", forwardRef)`
  margin: 1em 0 1.25em;
  padding-left: 2em;
  &.--debug {
    background: rgba(255, 128, 128, 0.5);
  }
`

export function List({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<ListElement>) {
  if (element.style === "ordered") {
    return (
      <$List
        as="ol"
        {...attributes}
        className={isDebug ? "--debug" : ""}
        data-list
        data-ordered-list
      >
        {children}
      </$List>
    )
  } else if (element.style === "unordered") {
    return (
      <$List
        as="ul"
        {...attributes}
        className={isDebug ? "--debug" : ""}
        data-list
        data-unordered-list
      >
        {children}
      </$List>
    )
  } else {
    throw new Error(
      `Expected style to be "ordered" or "unordered" but was neither`
    )
  }
}
