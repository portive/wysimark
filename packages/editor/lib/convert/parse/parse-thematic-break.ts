import { HrElement } from "~/editor/types"
import * as Mdast from "../mdast"

/**
 * Parse a Thematic Break.
 *
 * Note that this doesn't actually use the `node` but we are assured that the
 * incoming ast is a Thematic Break. It was tested somewhere earlier to make
 * sure it is of the right type.
 *
 * We include the `node` in arguments so that this code is consistent with the
 * other parse code.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function parseThematicBreakNode(node: Mdast.ThematicBreak): HrElement {
  const block: HrElement = {
    type: "hr",
    children: [{ text: "" }],
  }
  return block
}
