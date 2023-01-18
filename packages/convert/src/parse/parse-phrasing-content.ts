import type { PhrasingContent } from "mdast"
import { Text as SlateText } from "slate"
import { Text } from "wysimark/src"

import { getMarksFromText } from "../serialize/serialize-line/utils"
import { MarkProps, Segment } from "../types"
import { assertUnreachable } from "../utils"

function areMarksEqual(a: Text, b: Text): boolean {
  const marksA = getMarksFromText(a)
  const marksB = getMarksFromText(b)
  return (
    marksA.length == marksB.length && marksA.every((v) => marksB.includes(v))
  )
}

export function normalizeSegments(segments: Segment[]): Segment[] {
  const nextSegments: Segment[] = []
  for (let i = 0; i < segments.length; i++) {
    const prevSegment: Segment | undefined =
      nextSegments[nextSegments.length - 1]
    nextSegments.push(
      ...normalizeSegment(segments[i], { prevSegment, segments, i })
    )
  }

  if (!SlateText.isText(nextSegments[0])) nextSegments.unshift({ text: "" })
  if (!SlateText.isText(nextSegments[nextSegments.length - 1]))
    nextSegments.push({ text: "" })
  return nextSegments
}

function normalizeSegment(
  segment: Segment,
  {
    prevSegment,
    segments,
    i,
  }: {
    prevSegment?: Segment
    segments: Segment[]
    i: number
  }
): Segment[] {
  const segmentIsText = SlateText.isText(segment)
  const prevSegmentIsText = SlateText.isText(prevSegment)
  const segmentIsElement = !segmentIsText
  const prevSegmentIsElement = !prevSegmentIsText

  if (prevSegment && prevSegmentIsElement && segmentIsElement) {
    return [{ text: "" }, segment]
  }
  /**
   * If the current segment is an Inline Element, then we can't merge it so we
   * return it as is
   */
  if (!segmentIsText) return [segment]
  /**
   * If the previous segment is an Inline Element, then we can't merge into it
   * so we return it as is
   */
  if (prevSegment === undefined || !prevSegmentIsText) return [segment]
  const marksEqual = areMarksEqual(prevSegment, segment)
  if (marksEqual) {
    prevSegment.text = [prevSegment.text, segment.text].join("")
    return []
  }

  return [segment]
}

export function parsePhrasingContents(
  phrasingContents: PhrasingContent[],
  marks: MarkProps = {}
): Segment[] {
  const segments: Segment[] = []
  for (const phrasingContent of phrasingContents) {
    segments.push(...parsePhrasingContent(phrasingContent, marks))
  }
  const nextInlines = normalizeSegments(segments)
  return nextInlines
}

function parsePhrasingContent(
  phrasingContent: PhrasingContent,
  marks: MarkProps = {}
): Segment[] {
  switch (phrasingContent.type) {
    case "footnoteReference":
      return [{ text: `[${phrasingContent.identifier}]` }]
    case "text":
      return [{ text: phrasingContent.value, ...marks }]
    case "strong":
      return parsePhrasingContents(phrasingContent.children, {
        ...marks,
        bold: true,
      })
    case "emphasis":
      return parsePhrasingContents(phrasingContent.children, {
        ...marks,
        italic: true,
      })
    case "delete":
      return parsePhrasingContents(phrasingContent.children, {
        ...marks,
        strike: true,
      })
    case "inlineCode": {
      return [{ text: phrasingContent.value, ...marks, code: true }]
    }
    case "link":
      return [
        {
          type: "anchor",
          href: phrasingContent.url,
          children: parsePhrasingContents(phrasingContent.children, marks),
        },
      ]
    case "linkReference":
    case "imageReference":
      throw new Error(
        `linkReference and imageReference should be converted to link and image through our transformInlineLinks function`
      )
    case "html":
      return [{ text: phrasingContent.value, code: true }]
  }
  assertUnreachable(phrasingContent)
}
