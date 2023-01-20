import type { PhrasingContent } from "mdast"

import { MarkProps, Segment } from "../../types"
import { assertUnreachable } from "../../utils"
import { normalizeSegments } from "./normalize-segments"
import { parseInlineImage } from "./parse-inline-image"

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
    case "delete":
      return parsePhrasingContents(phrasingContent.children, {
        ...marks,
        strike: true,
      })
    case "emphasis":
      return parsePhrasingContents(phrasingContent.children, {
        ...marks,
        italic: true,
      })
    case "footnoteReference":
      return [{ text: `[${phrasingContent.identifier}]` }]
    case "html":
      return [{ text: phrasingContent.value, code: true }]
    case "image":
      return parseInlineImage(phrasingContent)
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
    case "strong":
      return parsePhrasingContents(phrasingContent.children, {
        ...marks,
        bold: true,
      })
    case "text":
      return [{ text: phrasingContent.value, ...marks }]
    case "linkReference":
    case "imageReference":
      throw new Error(
        `linkReference and imageReference should be converted to link and image through our transformInlineLinks function`
      )
  }
  assertUnreachable(phrasingContent)
}
