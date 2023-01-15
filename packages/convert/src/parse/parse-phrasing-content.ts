import type { PhrasingContent } from "mdast"
import { Element, Text } from "wysimark/src"

import { MarkProps } from "../types"

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
    case "html":
      return [{ text: phrasingContent.value, code: true }]
  }
  assertUnreachable(phrasingContent)
}

function assertUnreachable(x: never): never {
  throw new Error(
    `Didn't expect to get here with value ${JSON.stringify(x, null, 2)}`
  )
}
