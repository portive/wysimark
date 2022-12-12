import { Descendant, Editor, Element } from "slate"

/**
 * This is a really useful method when converting some invalid children for
 * an `Element` into valid children. For example, if we pasting a bunch of
 * value into a `table-cell`, we are expecting `table-content` but we have
 * lists, code blocks/code lines, paragraphs, block-quotes, etc.
 *
 * This method returns an Array where each item represents the content of an
 * Element that contains inline children and is not a `void` Element. The
 * return value is an array of an array of `Descendant`.
 *
 * We can then convert these all into the valid type that we want.
 *
 * Also useful for `code-line` in a `code-block`.
 */
export function getLines(
  editor: Editor,
  elements: Element | Element[],
  lines: Array<Descendant[]> = []
) {
  // normalize elements to an Array
  elements = Array.isArray(elements) ? elements : [elements]
  for (const element of elements) {
    if (Editor.hasBlocks(editor, element) && !Editor.isVoid(editor, element)) {
      /**
       * `any` is required because `Editor.isVoid` asserts element to be of
       * type `Element` which is true however if `Editor.isVoid` is false,
       * TypeScript also asserts that it is not an `Element`; however in our
       * case here, if it returns false, then it is an `Element` that is not
       * `void`.
       *
       * This is a bug in Slate's assertion at the moment.
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getLines(editor, (element as any).children, lines)
      continue
    } else if (Editor.hasInlines(editor, element)) {
      lines.push(element.children)
    }
  }
  return lines
}
