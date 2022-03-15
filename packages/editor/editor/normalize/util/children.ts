import { Editor, Element, Node, Path, Transforms } from "slate"

/**
 * Remove any children that are not of a given `Element` type.
 *
 * This is useful for nested elements like a `table` that expects a specific
 * hierarchical structure (e.g. a `table` element with `tr` children and those
 * having `td` children).
 */

export function removeInvalidChildren(
  editor: Editor,
  path: Path,
  validTypes: Array<Element["type"]>
) {
  let normalized = false
  for (const [child, childPath] of Node.children(editor, path, {
    reverse: true,
  })) {
    if (!Element.isElement(child) || !validTypes.includes(child.type)) {
      Transforms.removeNodes(editor, { at: childPath })
      normalized = true
    }
  }
  return normalized
}
