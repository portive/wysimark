import { MarkKey } from "../../types"

export const ORDERED_MARK_KEYS: MarkKey[] = [
  "bold",
  "italic",
  "strike",
  "sup",
  "sub",
]

export const MARK_KEY_TO_TOKEN = {
  bold: "**",
  italic: "_",
  // ins: "++",
  strike: "~~",
  sup: "^",
  sub: "~",
  code: "`",
} as Record<MarkKey, string>
