import { MarkKey } from "../../../../types"

export const MARK_KEY_TO_TOKEN = {
  bold: "**",
  italic: "_",
  // ins: "++",
  strike: "~~",
  sup: "^",
  sub: "~",
  code: "`",
} as Record<MarkKey, string>

/**
 * Convert a single mark to a string
 */
function convertMarkToSymbol(mark: MarkKey): string {
  if (mark in MARK_KEY_TO_TOKEN) return MARK_KEY_TO_TOKEN[mark]
  throw new Error(
    `Could not find mark ${JSON.stringify(mark)} in MARK_KEY_TO_TOKEN lookup`
  )
}

/**
 * Convert an array of marks to a string
 */
export function convertMarksToSymbols(marks: MarkKey[]) {
  return marks.map(convertMarkToSymbol).join("")
}
