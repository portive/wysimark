import type { Element, Text } from "wysimark/src"
import { AnchorElement } from "wysimark/src/anchor-plugin"

export { Element, Text }
export type Segment = Text | AnchorElement

export type MarkProps = Omit<Text, "text">
export type MarkKey = keyof MarkProps
