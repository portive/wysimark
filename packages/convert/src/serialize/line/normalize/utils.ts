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
  segments: Node[]
  index: number
}

export function isText(segment: Node | undefined): segment is Text {
  return Slate.Text.isText(segment)
}

export function isElement(
  segment: Node
): segment is LineElement | AnchorElement {
  return Slate.Element.isElement(segment)
}

export function isSpace(text: Text) {
  return text.text.match(/^\s+$/)
}
