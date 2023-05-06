import { Segment } from "../../../types"

export type LineElement = { type: "line"; children: Segment[] }

export type Node = LineElement | Segment

export type NormalizeOptions = {
  parent?: Segment | LineElement
  node: Node
  prevNode?: Node
  nextNode?: Node
  nodes: Node[]
  index: number
}
