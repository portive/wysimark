import { HeadingElement } from "~/editor/types"
import * as Mdast from "../mdast"
import { parseLine } from "./parse-line"

/**
 * Parse heading
 */
export function parseHeadingNode(node: Mdast.Heading): HeadingElement {
  const block: HeadingElement = {
    type: "heading",
    level: Math.max(1, Math.min(node.depth, 6)) as HeadingElement["level"],
    children: parseLine(node.children, {}),
  }
  return block
}
