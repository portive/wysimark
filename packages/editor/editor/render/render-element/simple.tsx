import React from "react"
import { Node } from "slate"
import { CustomRenderElementProps } from "./utils"

/**
 * Generic Element where `tag` is passed in from `props.element.type`
 */
export function Heading(props: CustomRenderElementProps<"heading">) {
  const level = props.element.level
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  const text = Node.string(props.element)
  return (
    <Tag {...props.attributes} id={text}>
      {props.children}
    </Tag>
  )
}

/**
 * Paragraph
 */
export function Paragraph(props: CustomRenderElementProps<"p">) {
  return <p {...props.attributes}>{props.children}</p>
}
