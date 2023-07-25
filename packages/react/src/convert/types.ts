import { AnchorElement } from "~/src/anchor-plugin"
import type { Element, Text } from "~/src/entry"
import { ImageInlineElement } from "~/src/image-plugin/types"

export { Element, Text }
export type Segment = Text | AnchorElement | ImageInlineElement

export type MarkProps = Omit<Text, "text">
export type MarkKey = keyof MarkProps
