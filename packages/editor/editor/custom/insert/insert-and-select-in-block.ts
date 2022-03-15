import { Editor, Node, Path, Transforms } from "slate"
import {
  NestedBlockElement,
  VoidElement,
  isConvertibleBlockElement,
  isPrimaryBlockElement,
} from "~/editor/types"

/**
 * Move the selection at the start of the element at the given path. In a
 * nested element like a table, this would be the first cell of the table.
 */
function selectIn(editor: Editor, path: Path): Path {
  Transforms.select(editor, Editor.start(editor, path))
  return path
}

/**
 * Move the selection at the start of the next sibling element at the given
 * path. Uses `selectIn` to drill into first element like the first cell of
 * a table.
 */
function selectAfter(editor: Editor, afterPath: Path): Path {
  /**
   * `selectAfter` is only called when we know that there is a `nextNodeEntry`
   */
  const nextNodeEntry = Editor.next(editor, { at: afterPath })
  if (nextNodeEntry == null)
    throw new Error(`Unexpected as there should always be a nextNodeEntry`)
  return selectIn(editor, nextNodeEntry[1])
}

/**
 * When we insert a block into the document with this method, the selection
 * always ends up inside the inserted block at the start. The way it inserts
 * depends on where it is being inserted into.
 *
 * - Into a Convertible: The block is split
 * - Into a Nested or Void: Inserted after the element we are inserting into
 *
 * Note that for a VoidElement, we don't want the cursor inside but the rest
 * of that logic is handled in the `insertVoidBlock` method that calls this
 * method.
 *
 * This method is not to be used directly.
 */
export function insertAndSelectInBlock(
  editor: Editor,
  srcNode: NestedBlockElement | VoidElement
): Path | null {
  /**
   * If there's no selection, don't insert
   */
  if (editor.selection == null) return null

  const destPoint = editor.selection.anchor

  const destNodeEntry = Editor.above(editor, {
    at: destPoint,
    match: isPrimaryBlockElement,
    mode: "lowest",
  })

  /**
   * This shouldn't happen but it helps with type narrowing and if it does
   * happen, it will fail quietly.
   */
  if (destNodeEntry == null) return null

  const [destNode, destPath] = destNodeEntry

  const isConvertible = isConvertibleBlockElement(destNode)

  /**
   * If the element is convertible, we insert the element into it which will
   * split the convertible block.
   */
  if (isConvertible) {
    /**
     * When the cursor is at the start of a convertible, the inserted element
     * will be at the path that we are inserting into it.
     */
    const isAtStart = Editor.isStart(editor, destPoint, destPath)
    const isEmpty = Node.string(destNode) === ""

    /**
     * Insert the node
     */
    Transforms.insertNodes(editor, srcNode)

    /**
     * If we are inserting into an empty convertible, Slate keeps the empty
     * convertible and inserts the element underneath it. This is unexpected
     * behavior since when we insert at the start of a convertible element
     * with content, it doesn't keep that line.
     *
     * To normalize this we delete the empty convertible first and then select
     * into the nested element we inserted.
     *
     * There seems to be a bug somewhere, it might be in the browser, where
     * the cursor appears to not be in the text area when inserting into a table;
     * however, in checking the selection, it is in the proper place and the
     * cursor behaves properly apart from the original visual location so we
     * leave it as is for now.
     */
    if (isEmpty) {
      Transforms.delete(editor, { at: destPath })
      return selectIn(editor, destPath)
    } else if (isAtStart) {
      /**
       * If we're at the start, the inserted nested will be in the `destPath`
       * position so we select into it.
       */
      return selectIn(editor, destPath)
    } else {
      /**
       * If we're not at the start of the convertible, the inserted nested will
       * be after the `destPath` position so we select after it.
       */
      return selectAfter(editor, destPath)
    }
  }

  /**
   * If it's not convertible, then we are inserting into either a Nested
   * Element (like a table or code block) or a void element like an image or
   * hr Element.
   *
   * We insert into the position following the `PrimaryBlockElement`.
   */

  const insertPath = Path.next(destPath)

  Transforms.insertNodes(editor, srcNode, { at: insertPath })
  return selectAfter(editor, destPath)
}
