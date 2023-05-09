import { Editor, Element, Node, NodeEntry, Transforms } from "slate"

export function normalizeNode(editor: Editor, entry: NodeEntry<Node>): boolean {
  if (!Element.isElement(entry[0])) return false
  /**
   * Code lines should only contain plain text.
   *
   * - If they contain void elements like images, remove them
   * - If they contain non-void elements, unwrap them
   *
   * TODO:
   *
   * Convert pasted in elements to Markdown code
   */
  if (entry[0].type === "code-block-line") {
    for (const [child, path] of Node.children(editor, entry[1])) {
      if (!Element.isElement(child)) continue
      if (editor.isVoid(child)) {
        Transforms.removeNodes(editor, { at: path })
        return true
      } else {
        Transforms.unwrapNodes(editor, { at: path })
        return true
      }
    }
  }
  /**
   * Code blocks should only contain code lines.
   *
   * - If they contain void blocks like images, remove them
   * - If they contain non-void blocks, then convert them to code lines
   *
   * TODO:
   *
   * Convert pasted in elements to Markdown code
   */
  if (entry[0].type === "code-block") {
    for (const [child, path] of Node.children(editor, entry[1])) {
      if (!Element.isElement(child)) continue
      if (child.type === "code-block-line") continue
      if (child.type === "code-block") {
        /**
         * When pasting two or more lines of `code-block-line`, Slate will paste
         * it as a `code-block` which will create a `code-block` in a
         * `code-block`. The following code removes the lower `code-block`.
         */
        Transforms.unwrapNodes(editor, { at: path })
        return true
      } else if (editor.isVoid(child)) {
        Transforms.removeNodes(editor, { at: path })
        return true
      } else {
        Transforms.removeNodes(editor, { at: path })
        Transforms.insertNodes(editor, {
          type: "code-block-line",
          children: [{ text: Node.string(child) }],
        })
        return true
      }
    }
  }
  return false
}
