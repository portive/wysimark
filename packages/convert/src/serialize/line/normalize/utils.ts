import * as Slate from "slate"
import { AnchorElement } from "wysimark/src/anchor-plugin"

import { Segment, Text } from "../../../types"

export type LineElement = { type: "line"; children: Segment[] }

export type Node = LineElement | AnchorElement | Text

export type NormalizeOptions = {
  parent?: Segment | LineElement
  node: Node
  prevNode?: Node
  nextNode?: Node
  nodes: Node[]
  index: number
}

/**
 * Is this a Text Node
 */
export function isText(segment: Node | undefined): segment is Text {
  return Slate.Text.isText(segment)
}

/**
 * Is this an Element Node
 *
 * In the context of our normalizers, passing `isElement` means that it is
 * a `LineElement` or `AnchorElement`
 *
 * TODO:
 *
 * We should also add the following in the future:
 *
 * - `ImageInlineElement`
 * - `AttachmentElement`
 */
export function isElement(
  segment: Node
): segment is LineElement | AnchorElement {
  return Slate.Element.isElement(segment)
}

/**
 * Does the passed in `Text` node made up of only one or more spaces
 */
export function isSpace(text: Text) {
  return text.text.match(/^\s+$/)
}
