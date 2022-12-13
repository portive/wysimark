import { Editor, Element, Path, Transforms } from "slate"

import { matchLineElement } from "./match-line-element"

/**
 * Takes an Element at the given `at` path, and converts it to zero or more
 * other elements at the same path.
 *
 * A new Element is created for every line in the Element.
 *
 * A line are the leaf elements within an element that have only inline/text
 * content as its children and is not a void element.
 */
export function transformElementFromLines(
  editor: Editor,
  at: Path,
  createElement: () => Element
) {
  const matchEntries = [
    ...Editor.nodes(editor, {
      at,
      mode: "all",
      match: (node) => matchLineElement(editor, node),
      reverse: true,
    }),
  ]

  /**
   * We are always inserting immediately after the current childPath which
   * is where we typically find `list-content` and nested `list`
   */
  const nextPath = Path.next(at)
  for (const matchEntry of matchEntries) {
    const [, matchPath] = matchEntry
    /**
     * Create a new `list-content` which will contain the children of
     * the match
     */
    const nextElement = createElement()
    Editor.withoutNormalizing(editor, () => {
      /**
       * Insert the empty `list-content` right after the child we are
       * currently looking at.
       */
      Transforms.insertNodes(editor, nextElement, {
        at: nextPath,
      })
      /**
       * Move the children of the match
       */
      Transforms.moveNodes(editor, {
        at: matchPath,
        match: (node, path) => path.length === matchPath.length + 1,
        to: [...nextPath, 0],
      })
      // Transforms.removeNodes(editor, { at: childPath })
    })
  }
  Transforms.removeNodes(editor, { at })
}
