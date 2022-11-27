import React from "react"
import { BaseEditor, BaseElement, BaseText } from "slate"

import { $RenderElementProps, $RenderLeafProps } from "./constrained"

export const createPlugin = <
  PluginName extends string,
  PluginEditor extends BaseEditor = BaseEditor,
  PluginElement extends BaseElement = BaseElement,
  PluginText extends BaseText = BaseText
>(
  props: (editor: PluginEditor) => {
    /**
     * A string literal that uniquely identifies this plugin
     */
    name: PluginName
    // editor: PluginEditor
    // withEditor?: (editor: PluginEditor) => PluginEditor
    editorProps?: {
      isInline?: (element: PluginElement) => boolean | void
      isVoid?: (element: PluginElement) => boolean | void
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
        props: $RenderElementProps<PluginElement>
      ) => React.ReactElement | undefined
      /**
       * `renderLeaf` behaves similar to the `renderLeaf` prop on `Editable`
       * but if `renderLeaf` returns undefined, we move on to the next
       * next plugin's `renderLeaf`.
       *
       * `renderLeaf` is also typed to the `PluginText`
       */
      renderLeaf?: (
        props: $RenderLeafProps<PluginText>
      ) => React.ReactElement | undefined
    }
  }
) => props
