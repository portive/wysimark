import { BaseEditor, BaseElement, BaseText } from "slate"
import { Simplify, UnionToIntersection } from "type-fest"

import {
  ConstrainedRenderElementProps,
  ConstrainedRenderLeafProps,
} from "../types"

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
export type OExtractEditor<PO> = Simplify<
  UnionToIntersection<OInferCustomTypes<PO>["Editor"]>
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

export type PluginFunction<T extends ArraySafePluginCustomTypes> = (
  editor: T["Editor"]
) => PluginObject<T>

export type BasePluginObject = PluginObject<BasePluginCustomTypes>

export type BasePluginFunction = PluginFunction<BasePluginCustomTypes>

export type ExtractCustomTypesFromPluginFunctions<
  P extends PluginFunction<any>[]
> = OExtractText<ReturnType<P[number]>>
