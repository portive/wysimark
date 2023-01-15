import { Segment } from "../../../types"
import { normalizeNodes } from "./normalize-nodes"
import { LineElement } from "./types"

/**
 * Entry Point for normalizing
 */
export function normalizeLine(segments: Segment[]) {
  const line: LineElement = { type: "line", children: segments }
  normalizeNodes([line], undefined)
  return line.children
}
