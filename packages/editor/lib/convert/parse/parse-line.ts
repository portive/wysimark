import { CustomText, Segment } from "~/editor/types"
import { MarkProps } from "~/editor/types"
import { assertUnreachable } from "~/lib/assert-unreachable"
import * as Mdast from "../mdast"
import { mergeSegmentsByMark } from "../normalize/normalize-line"

const BR_REGEXP = /^([<]br\w*[/]?[>])$/

/**
 * Parse an HTML node and turn it into a code segment (ie. converts inline
 * HTML into inline code)
 */
function parseHTMLNode(node: Mdast.HTML, marks: MarkProps): CustomText[] {
  const markdown = node.value
  if (markdown.match(BR_REGEXP)) {
    /**
     * It node contains a break, turn it into a newline
     */
    return [{ text: "\n", ...marks }]
  } else {
    return [
      { text: node.value, code: true, ...marks },
      // { type: "code-segment", children: [{ text: node.value, ...marks }] },
    ]
  }
}

/**
 * Parse a link node
 */
function parseLinkNode(node: Mdast.Link, marks: MarkProps): Segment {
  return {
    type: "link",
    url: node.url,
    children: parseLine(node.children, marks) as CustomText[],
  }
}

/**
 * Parse a single inline node which is an Mdast.PhrasingContent and turn it
 * into an array of segments.
 */
export function parseInlineNode(
  node: Mdast.PhrasingContent,
  marks: MarkProps
): Segment[] {
  switch (node.type) {
    case "text": {
      /**
       * Remove zero width spaces.
       *
       * Zero width spaces are sometimes used to preserve certain types of
       * line type styles with a prefix like a list item.
       *
       * If the line was provided as `- ` then it would not be interpreted as
       * a bullet because content is required.
       *
       * We end up using `- &ZeroWidthSpace;` to ensure it is handled as a
       * list item. We clean it up on the way back in and remove it.
       */
      const text = node.value.replace(/\u200B/g, "")
      return [{ text, ...marks }]
    }
    case "strong":
      return parseLine(node.children, { ...marks, bold: true })
    case "delete":
      return parseLine(node.children, { ...marks, del: true })
    case "emphasis":
      return parseLine(node.children, { ...marks, italic: true })
    case "sub":
      return parseLine(node.children, { ...marks, sub: true })
    case "sup":
      return parseLine(node.children, { ...marks, sup: true })
    case "link":
      return [parseLinkNode(node, marks)]
    case "break":
      return [{ text: "\n", ...marks }]
    case "inlineCode":
      return [{ text: node.value, code: true, ...marks }]
    case "html":
      return parseHTMLNode(node, marks)
    case "linkReference": {
      /**
       * The `remark-inline-links` plugin converts reference links to inline
       * links so we only expect to see a `linkReference` when the user has
       * forgotten to include the actual link to reference to.
       *
       * In this case, we don't convert the link and just leave it as
       * straight text.
       */
      const children = node.children as Mdast.PhrasingContent[]
      return children.map((child) => parseInlineNode(child, marks)).flat()
    }
    case "imageReference":
      return [{ text: node.alt || "", ...marks }]
    // TODO: Find a way to handle image, footnot and footnoteReference inside a line
    case "image":
    case "footnote":
    case "footnoteReference":
      return []
    default:
      assertUnreachable(node)
  }
}

/**
 * Takes a children which is expected to represent a line like the children
 * of a paragraph, heading or list item. Turns this into Segment[] which is
 * the Slate representation.
 */
export function parseLine(
  nodes: Mdast.PhrasingContent[],
  marks: MarkProps = {}
): Segment[] {
  /**
   * If there are no nodes, make sure there is at least an empty text node
   */
  if (nodes.length === 0) {
    return [{ text: "" }]
  }

  const segments: Segment[] = []
  for (const node of nodes) {
    segments.push(...parseInlineNode(node, marks))
  }
  return mergeSegmentsByMark(segments)
}
