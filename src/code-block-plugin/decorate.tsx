import Prism, { languages, tokenize } from "prismjs"
import { Element, Node, Path, Range } from "slate"

import {
  CodeBlockElement,
  CodeBlockLineElement,
} from "CodeBlockPluginCustomTypes"

/**
 * Decorate Overview:
 *
 * We decorate the entire `code-block` at once because if we do it by line,
 * code that continues through multiple lines is not higlighted correctly.
 *
 * In order to higlight the entire `code-block` at once, we need to add a
 * newline to the end of each `code-line`. We cannot use `Node.string` on the
 * entire `code-block`.
 *
 * Once we receive the Prism tokens back, we need to create the ranges.
 *
 * The important part is that we track the offsets from the start. With the
 * offsets, we need to map those back to a `path` and `offset` of each
 * `code-line`. We also need to take into consideration that we have added
 * newlines to the end of each line so the algorithm needs to account for that.
 */

/**
 * Takes an array of text lines and returns an array with the offset
 * in characters of the start of each line.
 */

function getLineOffsets(lines: string[]) {
  let offset = 0
  const lineOffsets: number[] = []
  for (const line of lines) {
    lineOffsets.push(offset)
    offset = offset + line.length
  }
  return lineOffsets
}

/**
 * `decorate` method passed to `Editable`
 */

export function decorate(
  nodeEntry: [CodeBlockElement | CodeBlockLineElement, Path]
): Range[] {
  const [node, path] = nodeEntry

  if (!Element.isElement(node)) return []
  if (node.type !== "code-block") return []

  const lang: Prism.Grammar | undefined = languages[node.language]

  if (lang === undefined) return []

  /**
   * To decorate a code-block, we need to look at all the code in a code-block.
   *
   * We can't `Node.string` the entire block because it will join lines
   * together without newlines.
   *
   * For this reason, we create an array of `textLines` which is the text of
   * each codeLine plus a newline on the end of it.
   *
   * Then we join all of those together to get the text that was pass into
   * Prism.
   *
   * We need to keep `textLines` around so that we can extract the
   * `linePositions`
   */

  const codeLineElements = node.children

  const textLines = codeLineElements.map((node) => `${Node.string(node)}\n`)

  const text = textLines.join("")

  const lineOffsets: number[] = getLineOffsets(textLines)

  /**
   * Takes a character offset from the beginning of the `code-block` and
   * returns the `path` to the `code-line` and the `offset` within the
   * `code-line` which Slate needs to make the decoration.
   */

  function getPointFromOffset(offset: number) {
    for (let i = lineOffsets.length; i >= 0; i--) {
      const lineOffset = lineOffsets[i]
      if (lineOffset <= offset) {
        return {
          path: [...path, i],
          offset: offset - lineOffset,
        }
      }
    }
    throw new Error("This shouldn't happen and indicates a bug in the logic")
  }

  const ranges: (Range & { prismToken: string })[] = []

  const tokens = tokenize(text, lang)

  /**
   * Track current character offset from beginning of `textLines` joined
   * together.
   */

  let offset = 0

  /**
   * Tokens are either:
   *
   * - string: which means it is not syntax highlighted
   * - { type: string, content: string, length: number }: the highlight and content
   */
  for (const token of tokens) {
    if (typeof token === "string") {
      offset += token.length
    } else {
      const anchor = getPointFromOffset(offset)
      const focus = getPointFromOffset(offset + token.length)
      ranges.push({
        anchor,
        focus,
        prismToken: token.type,
      })
      offset += token.length
    }
  }

  return ranges
}
