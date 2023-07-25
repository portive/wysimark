import { Text } from "../../../types"
import { escapeText } from "../utils"

export function serializeNonCodeText(text: Text): string {
  return escapeText(text.text)
}
