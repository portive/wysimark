import type { PhrasingContent } from "mdast"
import { Text } from "wysimark/src"

import { MarkProps } from "../types"

export function parsePhrasingContents(
  phrasingContents: PhrasingContent[],
  marks: MarkProps = {}
): Text[] {
  // console.log(JSON.stringify(phrasingContents, null, 2))
  const texts: Text[] = []
  for (const phrasingContent of phrasingContents) {
    texts.push(...parsePhrasingContent(phrasingContent, marks))
  }
  return texts
}

function parsePhrasingContent(
  phrasingContent: PhrasingContent,
  marks: MarkProps = {}
): Text[] {
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
  }
  throw new Error(`Unhandled phrasingContent type ${phrasingContent.type}`)
}
