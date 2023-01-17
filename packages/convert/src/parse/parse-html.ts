import type { HTML } from "mdast"
import { Element } from "wysimark/src"

export function parseHTML(content: HTML): Element[] {
  return [
    {
      type: "code-block",
      language: "html",
      children: content.value.split("\n").map((line) => ({
        type: "code-block-line",
        children: [{ text: line }],
      })),
    },
  ]
}
