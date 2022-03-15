import { InlineElement } from "./inline"
import { CustomText } from "./text"

/**
 * Segments within a Line include text and links
 */

export type Segment = CustomText | InlineElement
