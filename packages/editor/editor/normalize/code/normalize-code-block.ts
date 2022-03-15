import { Editor, Node, Path, Transforms } from "slate"
import { removeElementIfEmpty } from "~/editor/normalize/util"
import { CodeBlockElement, isElementByType } from "../../types"

/**
 * A LinkElement cannot exist without any text. Once we remove the last
 * character, we remove the link.
 */

export function normalizeCodeBlock(
  editor: Editor,
  element: CodeBlockElement,
  path: Path
): boolean {
  /**
   * INVALID PARENT:
   *
   * Shuld be handled by parent. We only handle invalid parent for `Editor`
   * to improve performance.
   */

  /**
   * EMPTY CHILDREN:
   *
   * Remove if empty
   */
  if (removeElementIfEmpty(editor, element, path)) return true

  /**
   * INVALID CHILDREN:
   *
   * Convert children using `Node.string`. This has the nice side effect of
   * also fixing the empty children.
   */

  if (convertChildrenToCodeLine(editor, element, path)) return true

  return false
}

/**
 * Makes sure that all children of `code-block` is a `code-line`.
 *
 * This method also makes sure that any children of a given element are not `Text`
 * nodes. If they are, we wrap them in a `code-line`
 *
 * This is done because if somehow the child element of the Element is removed,
 * Slate will force a child to exist and it does this by inserting a `Text`
 * Node.
 *
 * IMPORTANT:
 *
 * This has been confirmed that it can happen when using a Transform that
 * removes the last child. We end up with a `Text` node.
 */

function convertChildrenToCodeLine(
  editor: Editor,
  element: CodeBlockElement,
  path: Path
): boolean {
  let normalized = false
  const children = Node.children(editor, path, {
    reverse: true,
  })
  for (const [child, childPath] of children) {
    if (isElementByType(child, "code-line")) continue
    Transforms.removeNodes(editor, { at: childPath })
    Transforms.insertNodes(
      editor,
      {
        type: "code-line",
        children: [{ text: Node.string(child) }],
      },
      { at: childPath }
    )
    normalized = true
  }
  return normalized
}
