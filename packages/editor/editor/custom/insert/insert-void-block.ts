import { insertAndSelectInBlock } from "./insert-and-select-in-block"
import { Editor, Node, Path, Transforms } from "slate"
import { isConvertibleBlockElement, VoidElement } from "~/editor/types"

/**
 * When inserting a void block like an image or a horizontal rule, we don't
 * want the cursor to remain in the void block because the cursor in a void
 * block is hard to see and is a little unnatural because it doesn't look
 * like a blinking | like it usually does.
 *
 * For example, on an <hr>, it turns into a blue line. The first reaction
 * may be to think that we just inserted a blue line and the cursor has
 * disappeared.
 *
 * Usually, a user doesn't want the cursor there anyways. There is nothing
 * the user can do except delete the <hr>. Instead, we normally want the
 * cursor to be on the next line.
 */

export function insertVoidBlock(editor: Editor, srcNode: VoidElement) {
  const insertPath = insertAndSelectInBlock(editor, srcNode)
  if (insertPath == null) return

  /**
   * If the next path adjacent sibling to the insertion path is a convertible
   * element, then move the cursor to the beginning of the convertible element.
   *
   * An easy way to do this is to just move the cursor over by one which is
   * what we do.
   */
  const nextPath = Path.next(insertPath)
  const hasNext = Node.has(editor, nextPath)
  if (hasNext) {
    const nextNode = Node.get(editor, nextPath)
    if (isConvertibleBlockElement(nextNode)) {
      /**
       * Move cursor one to the right
       */
      Transforms.move(editor)
      return
    }
  }
  /**
   * If the next adjacent sibling does not exist, then make it exist by adding
   * a paragraph. For example, this might happen if you insert a void at the
   * end of a blockquote.
   *
   * Also, if the next adjacent sibling is not a convertible element like a
   * nested element (table, code block) or a void element (image, hr) then we
   * also want to insert a paragraph.
   *
   * The general idea is that we want to make sure that after an insert, there
   * is a place for a natural looking cursor to go which blinks.
   */
  Transforms.insertNodes(
    editor,
    { type: "p", children: [{ text: "" }] },
    { at: nextPath }
  )
  /**
   * Move the cursor into the paragraph
   */
  Transforms.move(editor)
}
