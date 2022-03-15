import { MediaElement } from "~/editor/types"
import * as Mdast from "../mdast"

/**
 * Parse media node which comes in as an Mdast.Image
 */
export function parseMediaNode(node: Mdast.Image): MediaElement {
  return {
    type: "media",
    alt: node.alt || "",
    url: node.url,
    children: [{ text: "" }],
  }
}
