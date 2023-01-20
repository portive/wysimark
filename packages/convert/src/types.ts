import type { Element, Text } from "wysimark/src"
import { AnchorElement } from "wysimark/src/anchor-plugin"
import { ImageInlineElement } from "wysimark/src/image-plugin/types"

export { Element, Text }
export type Segment = Text | AnchorElement | ImageInlineElement

export type MarkProps = Omit<Text, "text">
export type MarkKey = keyof MarkProps
