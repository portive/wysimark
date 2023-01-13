import * as Slate from "slate"
import { AnchorElement } from "wysimark/src/anchor-plugin"

import { Segment, Text } from "../../../types"
import { normalizeAdjacentSpaces } from "./normalizeAdjacentSpaces"
import { normalizeSpacesAtEdgeOfText } from "./normalizeSpacesAtEdgeOfText"

type LineElement = { type: "line"; children: Segment[] }
type Node = LineElement | AnchorElement | Text

export function isText(segment: Node | undefined): segment is Text {
  return Slate.Text.isText(segment)
}

export function isSpace(text: Text) {
  return text.text.match(/^\s+$/)
}

function isAnchor(segment: Segment): segment is AnchorElement {
  return Slate.Element.isElement(segment)
}

export type NormalizeOptions = {
  parent?: Segment | LineElement
  node: Node
  prevNode?: Segment
  nextNode?: Segment
  segments: Segment[]
  index: number
}

const normalizers: Array<(options: NormalizeOptions) => boolean> = [
  normalizeAdjacentSpaces,
  normalizeSpacesAtEdgeOfText,
  // normalizeNoSpaceInFirstPosition,
  // normalizeRequiresOneSegment,
]

function normalizeNoSpaceInFirstPosition(options: NormalizeOptions): boolean {
  if (options.index !== 0) return false
  if (options.segments.length === 0) return false
  if (!isText(options.node)) return false
  if (!isSpace(options.node)) return false
  options.segments.splice(0, 1)
  return true
}

function normalizeRequiresOneSegment(options: NormalizeOptions): boolean {
  console.log(2222)
  if (options.segments.length > 0) return false
  options.segments.splice(0, 0, { text: "" })
  return true
}

export function normalizeLine(segments: Segment[]) {
  const line: LineElement = { type: "line", children: segments }
  normalizeSegments(segments, line)
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

export function normalizeSegments(
  segments: Segment[],
  parent: AnchorElement | LineElement = { type: "line", children: segments }
): Segment[] {
  const nextSegments = segments
  let isUpdated
  let runs = 0
  const maxReruns = segments.length * 72
  do {
    isUpdated = false
    runs = runs + 1
    if (runs > maxReruns)
      throw new Error(
        `There have been ${runs} normalization passes (72x the number of nodes at this level). This likely indicates a bug in the code.`
      )
    segmentLoop: for (let i = 0; i < segments.length; i++) {
      const segment: Segment = segments[i]
      const prevSegment: Segment | undefined = segments[i - 1]
      const nextSegment: Segment | undefined = segments[i + 1]
      const options: NormalizeOptions = {
        parent,
        node: segment,
        prevNode: prevSegment,
        nextNode: nextSegment,
        index: i,
        segments,
      }
      if (!runNormalizers(options)) continue
      isUpdated = true
      break segmentLoop
    }
  } while (isUpdated)
  return nextSegments
}
