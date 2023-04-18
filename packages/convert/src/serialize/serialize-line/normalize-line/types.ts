import { AnchorElement } from "~wysimark/src/anchor-plugin"
import { ImageInlineElement } from "~wysimark/src/image-plugin/types"

import { Segment, Text } from "../../../types"

export type LineElement = { type: "line"; children: Segment[] }

export type Node = LineElement | AnchorElement | ImageInlineElement | Text

export type NormalizeOptions = {
  parent?: Segment | LineElement
  node: Node
  prevNode?: Node
  nextNode?: Node
  nodes: Node[]
  index: number
}
