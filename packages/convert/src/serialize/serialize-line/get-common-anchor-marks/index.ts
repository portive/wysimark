import { MarkKey, Segment } from "../../../types"
import { getMarksFromText } from "../../utils"
import { isPlainSpace, isText } from "../normalize-line/utils"

export function getCommonAnchorMarks(segments: Segment[]): MarkKey[] {
  let commonMarks: MarkKey[] | undefined
  for (const segment of segments) {
    if (!isText(segment))
      /**
       * TODO:
       *
       * This is not actually true. It can be an inline image which we still
       * need to add.
       */
      throw new Error(
        `Expected every segment in an anchor to be a Text segment`
      )
    if (isPlainSpace(segment)) continue
    const currentMarks = getMarksFromText(segment)
    if (commonMarks === undefined) {
      commonMarks = currentMarks
      continue
    }
    commonMarks = commonMarks.filter((commonMark) =>
      currentMarks.includes(commonMark)
    )
  }
  if (commonMarks === undefined)
    throw new Error(
      `No text segments were found as children in this anchor which should not be possible`
    )
  return commonMarks
}
