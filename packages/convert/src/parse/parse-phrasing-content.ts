import type { PhrasingContent } from "mdast"
import { Element, Text } from "wysimark/src"

import { MarkProps } from "../types"
import { assertUnreachable } from "../utils"

export function parsePhrasingContents(
  phrasingContents: PhrasingContent[],
  marks: MarkProps = {}
): Array<Text | Element> {
  const texts: Array<Text | Element> = []
  for (const phrasingContent of phrasingContents) {
    texts.push(...parsePhrasingContent(phrasingContent, marks))
  }
  return texts
}

function parsePhrasingContent(
  phrasingContent: PhrasingContent,
  marks: MarkProps = {}
): Array<Text | Element> {
  switch (phrasingContent.type) {
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
