import { Editor, Element, Node, Path, Transforms } from "slate"

/**
 * Returns true if the given element is orphaned which means that it expected
 * a parent of a specific `type` but it was not there.
 */

export function isOrphaned(
  editor: Editor,
  element: Element,
  path: Path,
  parentType: Element["type"]
): boolean {
  const parentEntry = Editor.parent(editor, path)
  if (parentEntry == null) return false
  const [parentNode] = parentEntry
  return !Element.isElement(parentNode) || parentNode.type !== parentType
}

/**
 * Takes an element and makes sure it has the correct `parentType`.
 *
 * If it does not, we convert the element to be a `paragraph` which is
 * allowed as a child to most element types.
 */

export function convertOrphanToParagraph(
  editor: Editor,
  element: Element,
  path: Path,
  parentType: Element["type"]
): boolean {
  if (!isOrphaned(editor, element, path, parentType)) return false
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { type, children, ...propsToRemove } = element
  // const elementKeys = Object.keys(element).filter((el) =>
  //   !["type", "children"].includes(el)
  // )

  const nullProps = Object.fromEntries(
    Object.keys(propsToRemove).map((key) => [key, null])
  )
  const props = { type: "p", ...nullProps } as Partial<Node>
  Transforms.setNodes(editor, props, { at: path })
  return true
}

/**
 * If it's an orphan, unwrap the current element
 */

export function unwrapOrphanElement(
  editor: Editor,
  element: Element,
  path: Path,
  parentType: Element["type"]
): boolean {
  if (!isOrphaned(editor, element, path, parentType)) return false
  Transforms.unwrapNodes(editor, { at: path })
  return true
}
