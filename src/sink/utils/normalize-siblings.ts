import { Editor, Element, Node, NodeEntry, Transforms } from "slate"

/**
 * Looks at an Element and merges it with its previous and next sibling if
 * it matches the criteria for `shouldMerge`.
 *
 * NOTE:
 *
 * We try and merge both with previous and next node because `normalizeNode`
 * is only called on a node that changes. For example, if we only checked on
 * the previous node, if a specific node were to change, it could cause it to
 * merge with previous; however, even if it met the critera for merging with
 * the next, this wouldn't happen (even though the next would have the
 * criteria to merge with it's previous) because the next would not have
 * change and `normalizeNode` would not have been called on it.
 *
 * This is why this method needs to check both previous and next.
 *
 * We only do one at a time because it simplifies the understanding of the
 * code and also reduces the amount of code.
 */
export function normalizeSiblings<T extends Node>(
  editor: Editor,
  entry: NodeEntry<T>,
  shouldMerge: (el1: Element, el2: Element) => boolean
) {
  const [node, path] = entry
  /**
   * Try to merge with previous node
   */
  if (!Element.isElement(node)) return false
  const prevEntry = Editor.previous(editor, { at: path })
  if (
    prevEntry &&
    Element.isElement(prevEntry[0]) &&
    shouldMerge(prevEntry[0], node)
  ) {
    Transforms.mergeNodes(editor, { at: path })
    return true
  }
  /**
   * Try to merge with next node
   */
  const nextEntry = Editor.next(editor, { at: path })
  if (
    nextEntry &&
    Element.isElement(nextEntry[0]) &&
    shouldMerge(node, nextEntry[0])
  ) {
    Transforms.mergeNodes(editor, { at: nextEntry[1] })
    return true
  }
  return false
}
