import { Editor, Element, Node, Path, Transforms } from "slate"
import { InlineElement, LinkElement } from "../../types"

export function normalizeLink(
  editor: Editor,
  node: InlineElement,
  path: Path
): boolean {
  /**
   * INVALID PARENT:
   *
   * n/a
   */
  /**
   * EMPTY CHILDREN:
   *
   * Remove empty links
   */
  if (removeEmptyLink(editor, node, path)) return true
  /**
   * INVALID CHILDREN:
   *
   * Text children are fine. But nested inlines need to be lifted because we
   * don't allow nested inlines in our schema.
   */
  if (liftNestedLink(editor, node, path)) return true
  /**
   * SHAPE:
   *
   * n/a
   */
  return false
}

/**
 * A LinkElement cannot exist without any text. Once we remove the last
 * character, we remove the link.
 */
export function removeEmptyLink(
  editor: Editor,
  element: LinkElement,
  path: Path
) {
  if (element.children.length === 1 && element.children[0].text === "") {
    Transforms.removeNodes(editor, { at: path })
    return true
  }
  return false
}

/**
 * A LinkElement cannot exist without any text. Once we remove the last
 * character, we remove the link.
 */
export function liftNestedLink(
  editor: Editor,
  element: Element,
  path: Path
): boolean {
  /**
   * If any of the children of an inline contain an Element (we are expecting
   * text), then lift them out of the inline.
   *
   * Note that when we lift, the `element` stays intact and becomes a sibling
   * of the inline.
   */
  let normalized = false
  for (const [child, childPath] of Node.children(editor, path, {
    reverse: true,
  })) {
    if (Element.isElement(child)) {
      Transforms.liftNodes(editor, { at: childPath })
      normalized = true
    }
  }
  return normalized
}
