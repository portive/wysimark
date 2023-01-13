import { MarkKey } from "../../types"

export const PREFERRED_MARK_KEY_ORDER: MarkKey[] = [
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
} as const
