import React from "react"
import {
  BaseElement,
  BaseRange,
  BaseText,
  Editor,
  NodeEntry,
  Path,
} from "slate"

import { ConstrainedRenderElementProps, ConstrainedRenderLeafProps } from "."

/**
 * When creating a single PluginCustomType, we want to constrain it as much as
 * possible. These are the constraints.
 */
export type BasePluginCustomTypes = {
  Name: string
  Editor: Record<string, unknown>
  Element: BaseElement
  Text: BaseText
}

/**
 * When we are accepting an array of plugins, unfortunately we can't be as
 * restrictive as TypeScript throws an error saying that the second plugin is
 * incompatible with the first. So we have a less type safe version with any
 * for that use case.
 *
 * WEIRD:
 *
 * If I make any of these property keys optional, for example to suggest that
 * you don't need to provide a property for every entry in the array, this
 * shows a type mismatch when used in an array. It shows a type mismatch even
 * if the items in the array are all provided or if the array has only one
 * item that matches.
 */
export type ArraySafePluginCustomTypes = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Name: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Editor: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Element: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Text: any
}

/**
 * This is how we define the PluginCustomTypes.
 */
export type PluginCustomTypes<T extends BasePluginCustomTypes> = T

/**
 * Once a Plugin is executed, it returns this Object that defines how the
 * plugin should behave.
 */
export type PluginObject<T extends BasePluginCustomTypes> = {
  /**
   * A string literal that uniquely identifies this plugin
   */
  name: T["Name"]
  // editor: PluginEditor
  // withEditor?: (editor: PluginEditor) => PluginEditor
  editor?: {
    /**
     * TODO:
     *
     * Consider forcing these methods to return either `true` or `void` and
     * not have an ability to specify `false` directly. This would potentially
     * be better to reduce the number of non-necessary steps since at the end
     * these methods return `false` anyways.
     */
    /**
     * If the element is considered handled, we return a boolean value.
     * If it isn't handled yet, we don't return any value (e.g. `undefined`)
     */
    isInline?: (element: T["Element"]) => boolean | void
    isVoid?: (element: T["Element"]) => boolean | void
    /**
     * Custom `SinkEditor` extensions to identify master and slave elements.
     *
     * Master and slave is out of style but the challenge was finding a name
     * that better described the relationship. When one is found, change these
     * names.
     */
    isMaster?: (element: T["Element"]) => boolean | void
    isConvertible?: (element: T["Element"]) => boolean | void
    isSlave?: (element: T["Element"]) => boolean | void
    isStandalone?: (element: T["Element"]) => boolean | void

    /**
     * If the action insert considered handled, we return `true`.
     * If it isn't handled yet, return `false`.
     * For type safety, you must return a `boolean` and must not return
     * `undefined`.
     */
    deleteBackward?: (unit: "character" | "word" | "line" | "block") => boolean
    deleteForward?: (...args: Parameters<Editor["deleteBackward"]>) => boolean
    deleteFragment?: () => boolean
    insertBreak?: () => boolean
    insertFragment?: (fragment: Node[]) => boolean
    insertNode?: (node: Node) => boolean
    insertText?: (text: string) => boolean
    normalizeNode?: (entry: NodeEntry) => boolean
  }
  editableProps?: {
    decorate?: ((entry: [T["Element"], Path]) => BaseRange[]) | undefined
    /**
     * All of these plugin event handlers work like the standard event handler
     * with one exception. If the handler returns true, it signals that the
     * plugin handled the event handler. If the handler return false, it signals
     * that it hasn't handled it and will then try running the next one.
     *
     * The plugin must handle calling e.preventDefault and e.stopPropagation
     * if it wishes to.
     */
    onKeyDown?: (e: React.SyntheticEvent<Element, KeyboardEvent>) => boolean
    onKeyUp?: (e: React.SyntheticEvent<Element, KeyboardEvent>) => boolean
    onKeyPress?: (e: React.SyntheticEvent<Element, KeyboardEvent>) => boolean
    /**
     * `renderElement` behaves similar to the `renderElement` prop on `Editable`
     * but if `renderElement` returns undefined, we move on to the next
     * next plugin's `renderElement`.
     *
     * `renderElement` is also typed to the `PluginElement`
     */
    renderElement?: (
      props: ConstrainedRenderElementProps<T["Element"]>
    ) => React.ReactElement | undefined
    /**
     * `renderLeaf` behaves similar to the `renderLeaf` prop on `Editable`
     * but if `renderLeaf` returns undefined, we move on to the next
     * next plugin's `renderLeaf`.
     *
     * `renderLeaf` is also typed to the `PluginText`
     *
     * The `props.children` of `renderLeaf` may be the result of an earlier
     * `renderLeaf` call. In order to make this work, the `attributes`
     * are automatically added to the top-most element so you should not
     * add it yourself. In fact, we remove `attributes` to prevent you from
     * trying to do it yourself!
     */
    renderLeaf?: (
      props: ConstrainedRenderLeafProps<T["Text"]>
    ) => React.ReactElement | undefined
  }
}

export type PluginFunction<T extends BasePluginCustomTypes> = (
  /**
   * We make this T["Editor"] to make sure we get all off the properties
   * for the plugin but also add `Editor` so that Editor will pass the typing
   * for Transform methods and such that take an `Editor` object.
   */
  editor: T["Editor"] & Editor
) => PluginObject<T>
