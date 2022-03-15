import React from "react"
import { RenderElementProps } from "slate-react"
import { assertUnreachable } from "~/lib/assert-unreachable"
import { BlockQuote } from "./block-quote"
import { CodeBlock, CodeLine } from "./code"
import { HorizontalRule } from "./horizontal-rule"
// import { Media } from "./media"
import { Media } from "./image"
import { Link } from "./link"
import { OrderedListItem, TaskListItem, UnorderedListItem } from "./list"
import { Heading, Paragraph } from "./simple"
import { Table, Td, Tr } from "./table"

/**
 * `renderElement`
 */
export function renderElement(props: RenderElementProps) {
  const { element } = props
  switch (element.type) {
    /**
     * Simple
     */
    case "heading":
      return <Heading {...props} element={element} />
    case "p":
      return <Paragraph {...props} element={element} />
    /**
     * Inline Segments
     */
    case "link":
      return <Link {...props} element={element} />
    /**
     * Block Quote
     */
    case "blockquote":
      return <BlockQuote {...props} element={element} />
    /**
     * Code Block
     */
    case "code-block":
      return <CodeBlock {...props} element={element} />
    case "code-line":
      return <CodeLine {...props} element={element} />
    /**
     * Media
     */
    case "media":
      return <Media {...props} element={element} />
    /**
     * Horizontal Rule
     */
    case "hr":
      return <HorizontalRule {...props} element={element} />
    /**
     * List
     */
    case "unordered-list-item":
      return <UnorderedListItem {...props} element={element} />
    case "ordered-list-item":
      return <OrderedListItem {...props} element={element} />
    case "task-list-item":
      return <TaskListItem {...props} element={element} />
    /**
     * Table
     */
    case "table":
      return <Table {...props} element={element} />
    case "tr":
      return <Tr {...props} element={element} />
    case "td":
      return <Td {...props} element={element} />
    default:
      return assertUnreachable(element)
  }
}
