import { CodeBlockElement, CodeLineElement, UnstyledText } from "~/editor/types"
import { assertDefined } from "~/lib/assert-defined"
import {
  mergeSegmentsByMark,
  splitSegmentsAtBoundaries,
  trimSegments,
} from "./normalize-line"

/**
 * Remove trailing spaces in a code line
 */
function normalizeCodeLine(codeline: CodeLineElement): CodeLineElement {
  const children: UnstyledText[] = mergeSegmentsByMark(
    trimSegments(splitSegmentsAtBoundaries(codeline.children as any) as any, {
      trimStart: false,
      trimEnd: true,
    })
  ) as UnstyledText[]
  return {
    type: "code-line",
    children,
  }
}

/**
 * Takes a Code block and normalizes it by removing trailing spaces in each
 * code line
 */
export function normalizeCode(codeBlock: CodeBlockElement): CodeBlockElement {
  assertDefined(codeBlock.children)
  const codelines: CodeLineElement[] = codeBlock.children.map(normalizeCodeLine)
  return { ...codeBlock, children: codelines }
}
