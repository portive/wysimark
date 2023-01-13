import { Text } from "../../types"

export function normalizeLineSpaces(texts: Text[]) {
  const nextTexts: Text[] = [texts[0]]
  for (let i = 1; i < texts.length; i++) {
    /**
     * The last item in nextTexts
     */
    const a = nextTexts[nextTexts.length - 1]
    const b = texts[i]
    const mergedTexts = normalizeSpacesInAdjacentText(a, b)
    nextTexts.splice(-1, 1, ...mergedTexts)
  }
  return nextTexts
}

function normalizeSpacesInAdjacentText(a: Text, b: Text): Text[] {
  /**
   * Check if a ends in a space or b starts with a space
   */
  const aMatch = a.text.match(/^(.*?)(\s+)$/i)
  const bMatch = b.text.match(/^(\s+)(.*)$/i)
  /**
   * If neither a ends in a space nor b starts with a space, then we don't need
   * to move the boundaries to follow markdowns mark rule.
   */
  if (aMatch === null && bMatch == null) return [a, b]

  return [
    {
      ...a,
      text: aMatch ? aMatch[1] : a.text,
    },
    {
      text: `${aMatch ? aMatch[2] : ""}${bMatch ? bMatch[1] : ""}`,
    },
    { ...b, text: bMatch ? bMatch[2] : b.text },
  ].filter((text) => text.text.length > 0)
}
