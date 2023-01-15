import { MarkKey } from "../../types"

/**
 * When adding back marks, this is the order in which we add them back.
 *
 * The order is determined by an educated guess about which marks are more
 * likely to be chaging inside other marks. For example, this is probably pretty
 * common:
 *
 * **This is x^2^**
 *
 * Having a superscript inside of a bold. But it's probably rare to have bold
 * switched on/off inside a superscript.
 */
export const ORDERED_MARK_KEYS: MarkKey[] = [
  "bold",
  "italic",
  "underline",
  "strike",
  "sup",
  "sub",
  "code",
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
