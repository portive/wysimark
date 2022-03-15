import { BlockquoteElement } from "~/editor/types"
import * as Mdast from "../mdast"
import { parseRootNodes } from "."

/**
 * Parse a block quote
 */
export function parseBlockquote(node: Mdast.Blockquote): BlockquoteElement {
  return {
    type: "blockquote",
    children: parseRootNodes(node.children),
  }
}
