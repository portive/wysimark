import { Text } from "../../types"

export function normalizeTextPair(a: Text, b: Text): Text[] {
  /**
   * Check if a ends in a space or b starts with a space
   */
  const matchA = a.text.match(/^(.*?)(\s+)$/i)
  const matchB = b.text.match(/^(\s+)(.*)$/i)

  /**
   * If neither a ends in a space nor b starts with a space, then we don't need
   * to move the boundaries to follow markdowns mark rule.
   */
  if (matchA === null && matchB == null) return [a, b]

  const nextA: Text = matchA ? { text: matchA[1] } : a
  const nextB: Text = matchB ? { text: matchB[2] } : b
  const space: Text = {
    text: `${matchA ? matchA[2] : ""}${matchB ? matchB[1] : ""}`,
  }
  // console.log({ textA: a, textB: b, matchA, matchB, nextA, space, nextB })

  return [nextA, space, nextB]
}
