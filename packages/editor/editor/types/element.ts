import { Element, Node } from "slate"
import { AssertType } from "@thesunny/assert-type"
import { Narrow } from "../utils"
import { BlockquoteElement } from "./blockquote"
import { CodeBlockElement, CodeLineElement } from "./code"
import { defineElementType } from "./is-element-utils"
import { TableElement, TdElement, TrElement } from "./table"
import { CustomText } from "./text"
import { VoidElement } from "./void"
import { VoidChildren } from "./void"
import { FlushBlockElement, InlineElement, ListItemElement } from "."

/**
 * `isInlineElement`
 *
 * IMPORTANT: `isInlineElement` overrides `editor.isInline`
 */

export const [INLINE_TYPES, isInlineElement] =
  defineElementType<InlineElement>()(["link"], true)

/**
 * `isVoidElement`
 *
 * IMPORTANT: `isVoidElement` overrides `editor.isVoid`
 *
 * We define it as any `Element` that has as its children `VoidChildren`.
 * This ensures that the Void Element is defined properly with `VoidChildren`
 */

export const [VOID_TYPES, isVoidElement] = defineElementType<VoidElement>()(
  ["hr", "media"],
  true
)

/**
 * Seamless elements are elements that have no seems (text spaces) between
 * two of them when they are next to each other. Like two images.
 *
 * There is no obvious way to insert a paragraph between two seamless elements
 * without a visual user interface. For example, if we have two images and we
 * want to insert a paragraph between them, how do we do it in an obvious way.
 *
 * Note that we can build the UI so that when we hit enter while the image is
 * selected, that it inserts a space after it. This is the way that Slite
 * works; however, that's still not intuitive. You'd have to know this ahead
 * of time or take a guess.
 *
 * Seamless elements also includes tables, horizontal rules and code blocks.
 */

type SeamlessElement =
  | TableElement
  | VoidElement
  | CodeBlockElement
  | BlockquoteElement
export const [SEAMLESS_TYPES, isSeamlessElement] =
  defineElementType<SeamlessElement>()(
    ["table", "hr", "media", "code-block", "blockquote"],
    true
  )

/**
 * This code ensures that an `Element` with children of `VoidChildren` exactly
 * matches the type `VoidElement` to avoid accidentally defining `VoidElement`
 * incorrectly or missing some `VoidElement`s.
 */

type CalculatedVoidElement = Narrow<Element, { children: VoidChildren }>

AssertType.Equal<VoidElement, CalculatedVoidElement>(true)

/**
 * Flush Block Types
 */

export const [FLUSH_TYPES, isFlushElement] =
  defineElementType<FlushBlockElement>()(["p", "heading"], true)

/**
 * List Item Types
 */

export const [LIST_ITEM_TYPES, isListItemElement] =
  defineElementType<ListItemElement>()(
    ["ordered-list-item", "unordered-list-item", "task-list-item"],
    true
  )

/**
 * Convertible Types
 *
 * Convertible types are the element types that can easily be converted from
 * one type to another. Specifically, we typically don't insert convertible
 * types into the document. Instead, we toggle from a type like a `p` type
 * to a `heading` type or some form of `ListItemElement` type.
 */

export type ConvertibleBlockElement = FlushBlockElement | ListItemElement

export const [CONVERTIBLE_TYPES, isConvertibleBlockElement] =
  defineElementType<ConvertibleBlockElement>()(
    [...FLUSH_TYPES, ...LIST_ITEM_TYPES],
    true
  )

/**
 * Nested Block Elements like `table` and `code-block`
 */

export type NestedBlockElement = TableElement | CodeBlockElement

export const [NESTED_BLOCK_TYPES, isNestedBlockElement] =
  defineElementType<NestedBlockElement>()(["table", "code-block"], true)

/**
 * Primary Block Elements
 *
 * All the block elements that can be the immediate children of a `blockquote`
 * with the exception of another `blockquote`. This type is primarily used to
 * identify the boundaries of `clearRange` which allows for deletes without
 * inappropriately joining nested elements with other elements.
 */

export type PrimaryBlockElement =
  | ConvertibleBlockElement
  | VoidElement
  | NestedBlockElement

export const [PRIMARY_BLOCK_TYPES, isPrimaryBlockElement] =
  defineElementType<PrimaryBlockElement>()(
    [...CONVERTIBLE_TYPES, ...VOID_TYPES, ...NESTED_BLOCK_TYPES],
    true
  )

/**
 * Root Block Elements
 *
 * All the elements that can be found at the root of a document
 *
 * Any Block Element that can be at the root level of the editor (ie. the
 * direct children of the Editor object)
 */

export type RootBlockElement = PrimaryBlockElement | BlockquoteElement

export const [ROOT_BLOCK_TYPES, isRootBlockElement] =
  defineElementType<RootBlockElement>()(
    [...PRIMARY_BLOCK_TYPES, "blockquote"],
    true
  )

/**
 * Any Block Element that is not at the root level of the editor like table
 * rows or code lines that are within a code block.
 */

export type NonRootBlockElement = TrElement | TdElement | CodeLineElement

/**
 * Block Elements
 *
 * All of the block element types
 */

export type BlockElement = RootBlockElement | NonRootBlockElement

export const [BLOCK_TYPES, isBlockElement] = defineElementType<BlockElement>()(
  [...ROOT_BLOCK_TYPES, "tr", "td", "code-line"],
  true
)

/**
 * All Element types including Block and Segment
 */

export type CustomElement = BlockElement | InlineElement

/**
 * All of the valid Node types
 */

export type CustomNode = CustomElement | CustomText

/**
 * Takes a `Node` and returns whether the node is of the given type.
 *
 * Provides type narrowing.
 */

export function isElementByType<T extends CustomElement>(
  node: Node | null,
  type: CustomElement["type"]
): node is T {
  if (node == undefined) return false
  return Element.isElement(node) && node.type === type
}

/**
 * Similar to `isElementByType` but returns a function that takes a node as
 * the first argument which you are checking against the type. Can be useful
 * in `match` arguments in Slate which expect a function.
 */

export function IsElementByType<T extends CustomElement>(
  type: CustomElement["type"]
): (node: Node) => node is T {
  return function isElementType(node: Node | null): node is T {
    if (node == undefined) return false
    return Element.isElement(node) && node.type === type
  }
}
