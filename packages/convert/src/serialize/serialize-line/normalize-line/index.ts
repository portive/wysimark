import { Segment } from "../../../types"
import { normalizeNodes } from "./normalize-nodes"
import { LineElement } from "./types"

/**
 * Entry Point for normalizing
 */
export function normalizeLine(segments: Segment[]) {
  /**
   * We need to splat `segments` because `normalizeNodes` will manipulate the
   * array and we can't manipulate the original array.
   */
  const line: LineElement = { type: "line", children: [...segments] }
  normalizeNodes([line], undefined)
  return line.children
}
