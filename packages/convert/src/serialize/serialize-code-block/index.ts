import { CodeBlockElement } from "~wysimark/src/code-block-plugin"

import { serializeCodeLine } from "./serialize-code-line"

/**
 * Serializing a code block is usually three backticks folloed by the language,
 * then the code is raw verbatim and then three backticks to close.
 *
 * However, we have to account for if any line in the code starts with three
 * backticks. In that case, we need to start our code block with 4 backticks.
 * And if there are 4 backticks in the code, then we need to start it with 5.
 *
 * We always need to start our code block with one more backtick than can be
 * found starting any line in the code block.
 */
export function serializeCodeBlock(codeBlock: CodeBlockElement): string {
  const lines: string[] = []
  /**
   * Start with the default number of backticks
   */
  let backticks = 3
  for (const codeLine of codeBlock.children) {
    /**
     * Grab a raw code line from it
     */
    const lineOfCode = serializeCodeLine(codeLine)
    /**
     * Check if it starts with any backticks and if it does, make our backticks
     * one larger than the largest one.
     */
    const match = lineOfCode.match(/^([`]+)/)
    if (match) backticks = Math.max(backticks, match[1].length + 1)
    /**
     * Add it to our lines
     */
    lines.push(lineOfCode)
  }
  /**
   * At the very end, when we know how many backticks we need, add our backticks
   * and language at the start and the closing backticks at the end.
   */
  lines.unshift(`${"`".repeat(backticks)}${codeBlock.language}`)
  lines.push(`${"`".repeat(backticks)}`)
  return `${lines.join("\n")}\n\n`
}
