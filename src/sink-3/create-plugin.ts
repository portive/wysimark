import React from "react"
import { UnionToIntersection } from "type-fest"

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

/**
 * Takes an PluginObject and extracts the CustomTypes from it
 */
export type OInferCustomTypes<PO> = PO extends PluginObject<infer T> ? T : never

/**
 * In the case of `Element`, we want don't want the properties to be merged
 * together. They are either one type of `Element` or another. This is why we
 * don't use `UnionToIntersection`
 */
export type OExtractName<PO> = OInferCustomTypes<PO>["Name"]

/**
 * In the case of the `Editor` we are merging the editor properties together to
 * get our final editor which is why we use `UnionToIntersection`
 */
export type OExtractEditor<PO> = UnionToIntersection<
  OInferCustomTypes<PO>["Editor"]
>

/**
 * In the case of `Element`, we want don't want the properties to be merged
 * together. They are either one type of `Element` or another. This is why we
 * don't use `UnionToIntersection`
 */
export type OExtractElement<PO> = OInferCustomTypes<PO>["Element"]

/**
 * In the case of `Text`, we are merging the text properties together to
 * get our final Text object which is why we use `UnionToIntersection`
 */
export type OExtractText<PO> = UnionToIntersection<
  OInferCustomTypes<PO>["Text"]
>

export type OExtractCustomTypes<PO> = {
  Name: OExtractName<PO>
  Editor: OExtractEditor<PO>
  Element: OExtractElement<PO>
  Text: OExtractText<PO>
}

export type PluginFunction<T extends BasePluginCustomTypes> = (
  editor: T["Editor"]
) => PluginObject<T>

export type BasePluginObject = PluginObject<BasePluginCustomTypes>

export type BasePluginFunction = PluginFunction<BasePluginCustomTypes>

export type ExtractCustomTypesFromPluginFunctions<
  P extends PluginFunction<any>[]
> = OExtractText<ReturnType<P[number]>>

export const createPlugin = <T extends BasePluginCustomTypes>(
  fn: PluginFunction<T>
) => {
  return fn
}
