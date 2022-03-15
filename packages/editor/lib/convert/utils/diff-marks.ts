import { CustomText, Mark, MarkProps } from "~/editor/types"

export const MARKS_TO_TOKENS = {
  bold: "**",
  italic: "_",
  ins: "++",
  del: "~~",
  sup: "^",
  sub: "~",
} as const

type MarksToTokens = typeof MARKS_TO_TOKENS
type DiffableMarkKey = keyof MarksToTokens
type DiffableMarkToken = MarksToTokens[DiffableMarkKey]

export const MARKS_IN_ORDER = Object.keys(MARKS_TO_TOKENS) as DiffableMarkKey[]

export function getTokensFromText(text: CustomText): DiffableMarkToken[] {
  const tokens: DiffableMarkToken[] = []
  for (const mark of MARKS_IN_ORDER) {
    if (text[mark]) {
      tokens.push(MARKS_TO_TOKENS[mark])
    }
  }
  return tokens
}

/**
 * Returns marks in preferred order
 *
 * Exported for testing.
 */
export function getMarksInOrder(x: CustomText | MarkProps): Mark[] {
  const marks: DiffableMarkKey[] = []
  for (const markInOrder of MARKS_IN_ORDER) {
    if (x[markInOrder]) {
      marks.push(markInOrder)
    }
  }
  return marks
}

/**
 * Remove marks in preferred order
 */
function removeMarksInOrder(prevMarks: Mark[], nextMarkProps: MarkProps) {
  const targetMarks = getMarksInOrder(nextMarkProps)
  for (let i = 0; i < prevMarks.length; i++) {
    const prevMark = prevMarks[i]
    if (!targetMarks.includes(prevMark)) {
      return {
        innerMarks: [...prevMarks].slice(0, i),
        removeMarks: [...prevMarks].slice(i).reverse(),
      }
    }
  }
  return { innerMarks: prevMarks, removeMarks: [] }
}

/**
 * Takes a set of marks and then adds new marks until we match the target marks
 */
function addMarksInOrder(prevMarks: Mark[], nextMarkProps: MarkProps) {
  const addMarks: Mark[] = []
  const targetMarks = getMarksInOrder(nextMarkProps)
  for (const targetMark of targetMarks) {
    if (!prevMarks.includes(targetMark)) {
      addMarks.push(targetMark)
    }
  }
  return { addMarks, nextMarks: prevMarks.concat(addMarks) }
}

/**
 * Returns information about marks to add and remove but ignores `code` marks
 * because they are handled differently in Markdown.
 */
export function diffMarksExceptCode({
  prevMarks,
  nextMarkProps,
}: {
  prevMarks: Mark[]
  nextMarkProps: MarkProps
}): {
  addMarks: Mark[]
  removeMarks: Mark[]
  innerMarks: Mark[]
  nextMarks: Mark[]
} {
  const { removeMarks, innerMarks } = removeMarksInOrder(
    prevMarks,
    nextMarkProps
  )

  const { addMarks, nextMarks } = addMarksInOrder(innerMarks, nextMarkProps)
  return { removeMarks, innerMarks, nextMarks, addMarks }
}

/**
 * Takes an array of marks and tokenizes them except for `code` marks because
 * they are handled differently in Markdown.
 */
export function tokenizeMarksExceptCode(marks: Mark[]) {
  const tokens: DiffableMarkToken[] = []
  for (const mark of marks) {
    if (mark !== "code") {
      tokens.push(MARKS_TO_TOKENS[mark])
    }
  }
  return tokens.join("")
}
