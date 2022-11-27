import React from "react"

import { $RenderElementProps, $RenderLeafProps } from "./constrained"
import { BasePluginCustomTypes } from "./types"

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
    isInline?: (element: T["Element"]) => boolean | void
    isVoid?: (element: T["Element"]) => boolean | void
  }
  editableProps?: {
    /**
     * `renderElement` behaves similar to the `renderElement` prop on `Editable`
     * but if `renderElement` returns undefined, we move on to the next
     * next plugin's `renderElement`.
     *
     * `renderElement` is also typed to the `PluginElement`
     */
    renderElement?: (
      props: $RenderElementProps<T["Element"]>
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
      props: $RenderLeafProps<T["Text"]>
    ) => React.ReactElement | undefined
  }
}

export type PluginFunction<T extends BasePluginCustomTypes> = (
  editor: T["Editor"]
) => PluginObject<T>

export type BasePluginObject = PluginObject<BasePluginCustomTypes>

export type BasePluginFunction = PluginFunction<BasePluginCustomTypes>

export const createPlugin = <T extends BasePluginCustomTypes>(
  fn: PluginFunction<T>
) => {
  return fn
}
