import { Editor } from "slate"
import { NestedBlockElement } from "~/editor/types"
import { insertAndSelectInBlock } from "./insert-and-select-in-block"

/**
 * When we insert a nested block into the document, the selection always
 * ends up at the start of the inserted nested block. The way it inserts
 * depends on what it is being inserted into.
 *
 * - Convertible: The block is split
 * - Nested or Void: Inserted after the Nested or Void Element
 */
export function insertNestedBlock(editor: Editor, srcNode: NestedBlockElement) {
  insertAndSelectInBlock(editor, srcNode)
}
