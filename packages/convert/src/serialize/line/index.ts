/**
 * FIXME: Temporary disable
 */
/* eslint-disable prefer-const */
import { Text as SlateText } from "slate"

import { Element, MarkKey, MarkProps, Segment, Text } from "../../types"
import { MARK_KEY_TO_TOKEN, PREFERRED_MARK_KEY_ORDER } from "./mark-constants"
import { serializeSegment } from "./serialize-segment"

function getMarksPropsFromText(text: Text): MarkProps {
  const { text: _, ...marks } = text
  return marks
}

// function diffMarks(markList: MarkKey[], nextMarkProps: MarkProps) {
//   const markKeysToAdd: MarkKey[] = []
//   /**
//    * Iterate through the keys in `nextMarkProps` and if they don
//    */
//   for (const markKey of PREFERRED_MARK_KEY_ORDER) {
//     if (markKey in nextMarkProps && !markList.includes(markKey)) {
//       markKeysToAdd.push(markKey)
//     }
//   }
//   return { markKeysToAdd }
// }

// export function serializeLine(
//   inlines: Array<Text | Element>,
//   markList: MarkKey[] = []
// ) {
//   const parts: string[] = []
//   const lastMarkList = [...markList]
//   for (const inline of inlines) {
//     const markProps = getMarksPropsFromText(inline)
//     const diff = diffMarks(lastMarkList, markProps)
//     parts.push(serializeSegment(inline))
//   }
//   return parts.join("")
// }
export function serializeLine(inlines: Array<Text>) {
  const parts: string[] = []
  let a: Text = { text: "" }
  /**
   * NOTE:
   *
   * We call this `orderedMarks` because the order matters. In markdown, we
   * can't add a bold, then an italic, and then close the bold. For example,
   * we can't do:
   *
   * **bold _and italic**_
   *
   * We have to first peel off the italic like this
   *
   * **bold _and italic_**
   *
   * For this reason, and to keep us conscious of it, we name this variable
   * `orderedMarks`
   */
  let orderedMarks: MarkKey[] = []
  for (const b of [...inlines, { text: "" }]) {
    const [nextPart, nextA] = serializeTextPair(orderedMarks, a, b)
    parts.push(nextPart)
    a = nextA
  }
  return parts.join("")
}

function getMarks(text: Text): MarkKey[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { text: _, ...markProps } = text
  return Object.keys(markProps) as Array<MarkKey>
}

/**
 */
function splitTextWithSpace(a: string, b: string): string[] {
  /**
   * Check if a ends in a space or b starts with a space
   */
  const textMatch = a.match(/^(.*?)(\s+)$/i)
  const lookaheadTextMatch = b.match(/^(\s+)(.*)$/i)
  /**
   * If neither a ends in a space nor b starts with a space, then we don't need
   * to move the boundaries to follow markdowns mark rule.
   */
  if (textMatch === null && lookaheadTextMatch == null) return [a, b]

  return [a[1], `${a[2]}${b[1]}`, b[2]]
}

function serializeTextPair(
  orderedTextMarks: MarkKey[],
  /**
   * NOTE: This incoming text is guaranteed to not start with a space because it
   * would have been trimmed as part of the previous call to
   * `serializeTextPair`.
   */
  text: Text,
  /**
   * This lookahead text helps us apply the marks but the `lookaheadText` should
   * not be part of the markdown that is to be output.
   */
  lookaheadText: Text
): [string, Text] {
  // const diff = serializeMarks(text, getMarks(lookaheadText))

  /**
   * Check if a ends in a space or b starts with a space
   */
  const textMatch = text.text.match(/^(.*?)(\s+)$/i)
  const lookaheadTextMatch = lookaheadText.text.match(/^(\s+)(.*)$/i)

  /**
   * If neither a ends in a space nor b starts with a space, then we don't need
   * to move the boundaries to follow markdowns mark rule.
   */
  if (textMatch === null && lookaheadTextMatch == null)
    return [text.text, lookaheadText]

  const diff = diffMarks(orderedTextMarks, getMarks(lookaheadText))
  console.log({ text, lookaheadText, textMatch, lookaheadTextMatch })
  console.log("diff", diff)

  const symbols: string[] = diff.marksToAdd.map(
    (mark) => MARK_KEY_TO_TOKEN[mark]
  )

  return [`${text.text}${symbols.join("")}`, lookaheadText]
}

function diffMarks(orderedMarks: MarkKey[], nextMarks: MarkKey[]) {
  const missingMarks = orderedMarks.filter(
    (mark) => ![...nextMarks.values()].includes(mark)
  )
  const marksToAdd = [...nextMarks.values()].filter(
    (mark) => !orderedMarks.includes(mark)
  )
  console.log({ missingMarks, marksToAdd })
  return { missingMarks, marksToAdd }
}
