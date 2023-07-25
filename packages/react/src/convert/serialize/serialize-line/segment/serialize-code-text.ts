import { Text } from "../../../types"

export function serializeCodeText(text: Text): string {
  let max = 0
  for (const match of text.text.matchAll(/[`]+/g)) {
    max = Math.max(max, match[0].length)
  }
  if (max === 0) return `\`${text.text.replace(/[`]/g, "\\`")}\``
  return `${"`".repeat(max + 1)} ${text.text} ${"`".repeat(max + 1)}`
}
