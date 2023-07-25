import type { Element, Text } from "~react/src/entry"

import { AnchorElement } from "../../react/src/anchor-plugin"
import { ImageInlineElement } from "../../react/src/image-plugin/types"

export { Element, Text }
export type Segment = Text | AnchorElement | ImageInlineElement

export type MarkProps = Omit<Text, "text">
export type MarkKey = keyof MarkProps
