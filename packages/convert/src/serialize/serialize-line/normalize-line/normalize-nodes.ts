import { AnchorElement } from "~/src/anchor-plugin"

import { isElement } from "../utils"
import { runNormalizersOnNode } from "./run-normalizers-on-node"
import { LineElement, Node, NormalizeOptions } from "./types"

const MAX_RERUNS = 72

export function normalizeNodes(
  nodes: Node[],
  parent?: AnchorElement | LineElement
): boolean {
  let isAnyUpdated = false
  let isUpdated
  let runs = 0
  const maxReruns = (nodes.length + 1) * MAX_RERUNS
  do {
    isUpdated = false
    runs = runs + 1
    if (runs > maxReruns)
      throw new Error(
        `There have been ${runs} normalization passes (72x the number of nodes at this level). This likely indicates a bug in the code.`
      )
    segmentLoop: for (let i = 0; i < nodes.length; i++) {
      const node: Node = nodes[i]
      /**
       * Normalize the children of the current Node before normalizing the
       * Node itself.
       */
      if (isElement(node)) {
        const isChildrenUpdated = normalizeNodes(
          node.children as Array<AnchorElement | LineElement>,
          node
        )
        if (isChildrenUpdated) {
          isUpdated = true
          isAnyUpdated = true
          break segmentLoop
        }
      }
      /**
       * Create the normalizeOptions
       */
      const prevNode: Node | undefined = nodes[i - 1]
      const nextNode: Node | undefined = nodes[i + 1]
      const options: NormalizeOptions = {
        parent,
        node,
        prevNode,
        nextNode,
        index: i,
        nodes,
      }

      /**
       * Run the normalizers on this node.
       */
      if (runNormalizersOnNode(options)) {
        isUpdated = true
        isAnyUpdated = true
        break segmentLoop
      }
    }
  } while (isUpdated)
  return isAnyUpdated
}
