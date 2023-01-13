import * as Slate from "slate"
import { AnchorElement } from "wysimark/src/anchor-plugin"

import { Segment } from "../../../types"
import { mergeAdjacentSpaces } from "./merge-adjacent-spaces"
import { mustHaveOneTextChild } from "./must-have-one-text-child"
import { sliceSpacesAtNodeBoundaries } from "./slice-spaces-at-node-boundaries"
import { trimSpaceAtEndOfLine } from "./trim-spaces-at-end-of-line"
import { trimSpaceAtStartOfLine } from "./trim-spaces-at-start-of-line"
import { LineElement, Node, NormalizeOptions } from "./utils"

const normalizers: Array<(options: NormalizeOptions) => boolean> = [
  sliceSpacesAtNodeBoundaries,
  mergeAdjacentSpaces,
  trimSpaceAtStartOfLine,
  trimSpaceAtEndOfLine,
  mustHaveOneTextChild,
]

export function normalizeLine(segments: Segment[]) {
  const line: LineElement = { type: "line", children: segments }
  normalizeNodes([line], undefined)
  return line.children
}

function runNormalizers(options: NormalizeOptions) {
  for (const normalizer of normalizers) {
    const isHandled = normalizer(options)
    if (isHandled) {
      return true
    }
  }
  return false
}

function normalizeNodes(
  nodes: Node[],
  parent?: AnchorElement | LineElement
): boolean {
  let isAnyUpdated = false
  let isUpdated
  let runs = 0
  const maxReruns = (nodes.length + 1) * 72
  do {
    isUpdated = false
    runs = runs + 1
    if (runs > maxReruns)
      throw new Error(
        `There have been ${runs} normalization passes (72x the number of nodes at this level). This likely indicates a bug in the code.`
      )
    segmentLoop: for (let i = 0; i < nodes.length; i++) {
      const node: Node = nodes[i]
      if (Slate.Element.isElement(node)) {
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
      const prevSegment: Node | undefined = nodes[i - 1]
      const nextSegment: Node | undefined = nodes[i + 1]
      const options: NormalizeOptions = {
        parent,
        node: node,
        prevNode: prevSegment,
        nextNode: nextSegment,
        index: i,
        nodes: nodes,
      }
      if (!runNormalizers(options)) continue
      isUpdated = true
      isAnyUpdated = true
      break segmentLoop
    }
  } while (isUpdated)
  return isAnyUpdated
}
