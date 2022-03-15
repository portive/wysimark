import { BaseRange, Editor, Element, Node, Text } from "slate"
import { BlockElement, MarkProps, isBlockElement } from "../../types"

export type ToolbarState = {
  marks: MarkProps
  inLink: boolean
  block: BlockElement | null
  inBlockQuote: boolean
}

/**
 * Returns useful information about the current state of the editor that the
 * toolbar needs to display its state properly.
 *
 * For example, `bold`, `italic`, whether it's in a `p` or a `heading`, etc.
 */
export function getToolbarState(editor: Editor): ToolbarState {
  if (editor.selection == null) {
    return { marks: {}, block: null, inBlockQuote: false, inLink: false }
  }
  const upwardNodes = getUpwardNodesFromEditor(editor, editor.selection)
  const marks = extractMarks(editor, upwardNodes)
  const [inLink, inBlockQuote, block] = getStateFromElements(
    editor,
    upwardNodes
  )
  return { block, inLink, inBlockQuote, marks }
}

/**
 * Returns an array of nodes starting from the current selection focus up to
 * the `Editor` object.
 *
 * The first node will be a Text leaf.
 *
 * The last node will be the Editor object.
 */
function getUpwardNodesFromEditor(
  editor: Editor,
  selection: BaseRange
): Node[] {
  const nodes = Array.from(
    Node.levels(editor, selection.focus.path, { reverse: true })
  ).map(([node]) => node)
  return nodes
}

/**
 * Extract marks from nodes
 */
function extractMarks(editor: Editor, upwardNodes: Node[]): MarkProps {
  /**
   * If `editor.marks` is an object on the editor, it reflects the
   * marks that will be added to any inserted text.
   *
   * If it is `null`, then it uses the `marks` that are part of the `Text` leaf
   * that it is currently in.
   */
  if (editor.marks) {
    return editor.marks
  }
  /**
   * If there are no upward Nodes (i.e. there is no selection) then there are
   * no marks.
   */
  if (upwardNodes.length === 0) {
    return {}
  }

  /**
   * First node is always the leaf Node.
   */
  const leafNode = upwardNodes[0]

  /**
   * Extract the marks from that leaf node
   */
  if (Text.isText(leafNode)) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { text, ...marks } = leafNode
    return marks
  } else {
    /**
     * Log `upwardNodes` so we get useful debugging information on failure.
     *
     * NOTE:
     *
     * Getting to this code indicates that somewhere we placed the selection
     * such that we weren't selecting inside the Text node but rather inside
     * an Element node.
     *
     * We can usually fix this by using `Editor.start` or `Editor.end` with
     * the given node to place the seleciton into a valid location.
     *
     * WARNING:
     *
     * You may be tempted to return `{}` and be done with it but that is
     * inviting the use of invalid states and will eventually bite you back.
     */
    console.log("upwardNodes", upwardNodes)
    throw new Error(
      `This shouldn't happen because the first node should always be a leaf node.`
    )
  }
}

/**
 * Extract toolbar state from nodes
 */
function getStateFromElements(
  editor: Editor,
  upwardNodes: Node[]
): [boolean, boolean, BlockElement | null] {
  let inLink = false
  let inBlockQuote = false
  let firstBlock: BlockElement | null = null

  for (const node of upwardNodes) {
    /**
     * If it's not an Element, don't worry about it
     */
    if (!Element.isElement(node)) {
      continue
    }
    if (node.type === "link") {
      inLink = true
      continue
    }
    if (isBlockElement(node)) {
      if (firstBlock == null) {
        firstBlock = node
      } else {
        if (node.type === "blockquote") {
          inBlockQuote = true
          break
        }
      }
    }
  }
  return [inLink, inBlockQuote, firstBlock]
}
