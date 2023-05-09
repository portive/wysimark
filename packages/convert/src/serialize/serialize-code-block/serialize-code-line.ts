import { CodeBlockLineElement } from "~/src/code-block-plugin"

/**
 * Serializing a code line is simple under the assumption that the normalizers
 * in Wysimark are working correctly. Technically, a code-line should have
 * exactly one child with one `Text` node with no marks in it.
 */
export function serializeCodeLine(codeLine: CodeBlockLineElement): string {
  /**
   * As a safety measure, we make sure that we are receiving a `codeLine`
   */
  if (codeLine.type !== "code-block-line")
    throw new Error(
      `Expected all children of code-block to be a codeline but is ${JSON.stringify(
        codeLine,
        null,
        2
      )}`
    )
  /**
   * We are converting all segments under the assumption that they are text
   * segments.
   */
  return codeLine.children.map((segment) => segment.text).join("")
}
