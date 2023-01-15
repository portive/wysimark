import { Text } from "wysimark/src"

import { escapeText } from "../utils"

export function serializeNonCodeText(text: Text): string {
  return escapeText(text.text)
}
