import { ParagraphElement } from "~/editor/types"
import * as Mdast from "../mdast"
import { parseLine } from "./parse-line"

/**
 * Parse paragraph
 */
export function parseParagraphNode(node: Mdast.Paragraph): ParagraphElement {
  return {
    type: "p",
    children: parseLine(node.children, {}),
  }
}
