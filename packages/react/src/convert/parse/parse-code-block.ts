import type { Code } from "mdast"

import { Element } from "../types"

export function parseCodeBlock(content: Code): Element[] {
  const codeLines = content.value.split("\n")
  return [
    {
      type: "code-block",
      language: content.lang || "text",
      children: codeLines.map((codeLine) => ({
        type: "code-block-line",
        children: [{ text: codeLine }],
      })),
    },
  ]
}
