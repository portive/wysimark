import { MarkKey } from "../../../types"

const MARK_KEY_ORDER: MarkKey[] = [
  "bold",
  "italic",
  "underline",
  "sup",
  "sub",
  "strike",
  "code",
]

export function findMarksToAdd(
  orderedMarks: MarkKey[],
  targetMarks: MarkKey[]
) {
  const marksWeNeedToAdd = targetMarks.filter(
    (mark) => !orderedMarks.includes(mark)
  )
  /**
   * Sort Algorithm
   *
   * https://stackoverflow.com/a/44063445
   */
  const marksToAdd = marksWeNeedToAdd
    .slice()
    .sort((a, b) => MARK_KEY_ORDER.indexOf(a) - MARK_KEY_ORDER.indexOf(b))

  return marksToAdd
}
