import {
  BaseOperation,
  Editor,
  Element,
  SetNodeOperation,
  Transforms,
} from "slate"
import { History } from "slate-history"
import { RequireExactlyOne } from "type-fest"

/**
 * Extract the last operatioon from Slate's undo history. It is the last
 * operation in the last batch of the undo history.
 */
function extractLastOp(history: History): BaseOperation {
  const lastBatch = history.undos[history.undos.length - 1]
  return lastBatch.operations[lastBatch.operations.length - 1]
}

/**
 * Extracts the most recent `set_node` operation from Slate's undo history.
 */
function extractSetNodeOp(history: History): SetNodeOperation {
  const lastOp = extractLastOp(history)
  if (lastOp.type !== "set_node")
    throw new Error(`Expected set_node operation, got ${lastOp.type}.`)
  return lastOp
}

/**
 * This function updates an element in the editor in a way that makes Slate
 * think that the element was always the updated value.
 *
 * It does this by modifying the undo history:
 *
 * - modifies the initial `insert_node` operation
 * - modifies any `remove_node` operations so it reverts to the updated value
 * - modifies any `set_node` operations so it reverts to the updated value
 */
export function setElementTimeTraveling<
  T extends Element,
  K extends keyof T = keyof T
>(
  editor: Editor,
  prev: RequireExactlyOne<T, K>,
  next: RequireExactlyOne<T, K>
) {
  const keys = Object.keys(prev) as Array<K>
  const key = keys[0]
  const prevValue = prev[key] as unknown as T[K]

  /**
   * Modify the initial `insert_node` operation so that Slate thinks the
   * value we updated the node to is the value it originally inserted.
   *
   * Also modify any `remove_node` operations so that when we undo them,
   * they undo to the value we updated the node to.
   *
   * We do these together here as a performance optimization.
   */
  const { undos } = editor.history
  for (const undo of undos) {
    for (const op of undo.operations) {
      if (
        (op.type === "insert_node" || op.type === "remove_node") &&
        (op.node as T)[key] === prevValue
      ) {
        op.node = { ...op.node, ...next }
      }
    }
  }

  const nodeEntries = [
    ...Editor.nodes(editor, {
      mode: "all",
      at: [],
      match: (n) =>
        Element.isElement(n) &&
        /**
         * We can typecast here because when we know `n.type` is the same as
         * `el.type`, we know that `n` is of type `T`.
         */
        (n as T)[key] === prevValue,
    }),
  ]

  /**
   * We need to search through `children` to find all instances of the node
   * that we want to update. Note that the user could have copy and pasted or
   * cut and pasted so there may be multiple instances of the Element.
   */
  for (const nodeEntry of nodeEntries) {
    Transforms.setNodes(editor, next, { at: nodeEntry[1] })
    const lastSetNodeOp = extractSetNodeOp(editor.history)
    lastSetNodeOp.properties = next
  }
}

/**
 * This is the return type of `insertTimeTravelingElement`
 */
export type TimeTravelingElement<T extends Element> = {
  setNode: (partial: Partial<T>) => void
  insertedElement: T
}
