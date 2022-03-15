import { CustomText, LinkElement, Mark, Segment } from "~/editor/types"
import { Part } from "../convert-types"
import { tokenizeMarksExceptCode } from "../utils/diff-marks"
import { diffMarksExceptCode } from "../utils/diff-marks"
import {
  getMarkPropsFromMarks,
  getMarkPropsFromSegment,
} from "../utils/get-mark-props"
import { escapeText } from "./escape-text"
import { isLinkSegment, isTextSegment, token } from "./serialize-utils"

/**
 * Serialize a link
 */
function serializeLink(link: LinkElement, contextMarks: Mark[]): Part[] {
  const innerParts = serializeSegments(link.children, contextMarks)
  return [token("[", ""), ...innerParts, token(`](${link.url})`, "")]
}

/**
 * Serialize text
 */
function serializeText(segment: CustomText): Part {
  if (segment.code) {
    if (segment.text.includes("`")) {
      /**
       * TODO:
       * This is a little hacky at the moment. We are actually adding
       * double backticks but the code that calls the `serializeText` adds the
       * first set of backticks. If one backtick is found in the code, we add
       * the second set.
       *
       * Also... we need to account for if the code mark contains multiple
       * backticks then we need to escape multiple times there as well
       */
      return {
        markdown: `\`\` ${escapeCodeText(segment.text)} \`\``,
        string: segment.text,
      }
    } else {
      return {
        markdown: `\`${escapeCodeText(segment.text)}\``,
        string: segment.text,
      }
    }
  } else {
    return {
      markdown: escapeText(segment.text),
      string: segment.text,
    }
  }
}

/**
 * Escape text within a code text. We use different logic within code text
 * because there is less to escape as the inside is more literal; however,
 * we do have to escape the backtick itself and newlines are not allowed.
 */
function escapeCodeText(codeText: string) {
  return codeText.replace(/\n/g, "`<br>`")
}

// /**
//  * Serialize inline code and make sure it is escaped
//  */
// function serializeCode(code: CodeSegmentElement): Part[] {
//   const codeParts: Part[] = code.children.map((segment) => {
//     return {
//       markdown: escapeCodeText(segment.text),
//       string: segment.text,
//     }
//   })
//   return [token("`", ""), ...codeParts, token("`", "")]
// }

/**
 * Serialize a diff into parts that are the closing tokens first and then
 * the new opening tokens next
 */
function serializeDiff(diff: ReturnType<typeof diffMarksExceptCode>): Part[] {
  const parts: Part[] = []
  if (diff.removeMarks.length > 0) {
    parts.push({
      markdown: tokenizeMarksExceptCode(diff.removeMarks),
      string: "",
    })
  }
  if (diff.addMarks.length > 0) {
    parts.push({ markdown: tokenizeMarksExceptCode(diff.addMarks), string: "" })
  }
  return parts
}

/**
 * Serialize a line.
 *
 * The most complicated part of this happens in diffMarks and also the
 * normalize that happens to the segments before it gets here.
 *
 * We make sure that the marks are at the proper positions, just outside of
 * non-space segments.
 */
export function serializeSegments(
  segments: Segment[],
  contextMarks: Mark[]
): Part[] {
  const parts: Part[] = []
  let prevMarks: Mark[] = contextMarks
  for (const segment of segments) {
    const markProps = getMarkPropsFromSegment(segment)

    const diff = diffMarksExceptCode({ prevMarks, nextMarkProps: markProps })

    parts.push(...serializeDiff(diff))
    if (isTextSegment(segment)) {
      parts.push(serializeText(segment))
    } else if (isLinkSegment(segment)) {
      parts.push(...serializeLink(segment, diff.nextMarks))
    } else {
      throw new Error(`Unhandled segment type ${JSON.stringify(segment)}`)
    }
    prevMarks = diff.nextMarks
  }
  const diff = diffMarksExceptCode({
    prevMarks,
    nextMarkProps: getMarkPropsFromMarks(contextMarks),
  })
  parts.push(...serializeDiff(diff))
  return parts
}

/**
 * Serialize a line returning an array of `Part` which consists of `markdown`
 * and a text representation as `string`.
 *
 * Takes an optional third argument which allows us to specify if this
 * particular line should forcefully create a zero width space if there is
 * no content.
 *
 * This is important for certain prefixes like the beginning of a list.
 *
 * If we return no content, a bulleted list item that has the markdown `- `
 * will not return a bulleted list. This is because some content is required.
 */
export function serializeLine(
  segments: Segment[],
  contextMarks: Mark[] = [],
  forceZeroWidthSpace = false
): Part[] {
  if (
    forceZeroWidthSpace &&
    segments.length === 1 &&
    (segments[0] as CustomText).text === ""
  ) {
    return [{ markdown: "&ZeroWidthSpace;", string: "" }]
  }
  return serializeSegments(segments, contextMarks)
}
