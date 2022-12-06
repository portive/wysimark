import React, { cloneElement } from "react"
import { BaseEditor } from "slate"
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  useSlateStatic,
} from "slate-react"

import {
  ArraySafePluginCustomTypes,
  BasePluginCustomTypes,
  PluginFunction,
  PluginObject,
} from "../types"
import { createIsInline } from "./create-is-inline"
import {
  createRenderElements,
  createRenderLeaf,
  RenderElement,
  RenderLeaf,
} from "./sink-editable"

export {}

/**
 * SinkEditor just adds a `sink` object where we drop all of our sink
 * related data on.
 */
type SinkEditor<T extends BasePluginCustomTypes = BasePluginCustomTypes> = {
  sink: {
    plugins: PluginObject<T>[]
    renderElements: RenderElement[]
    renderLeaves: RenderLeaf[]
  }
}

/**
 * A sink is just a function
 */
export const createSink = <
  F extends PluginFunction<ArraySafePluginCustomTypes>[]
>(
  pluginConfigs: F
) => {
  /**
   * The `editor` in the props can be a `BaseEditor` but we transform it
   * into a `SinkEditor` before returning it.
   */
  const withSink = <E extends BaseEditor>(
    editor: E
  ): E & SinkEditor<ArraySafePluginCustomTypes> => {
    const sinkEditor = editor as E & SinkEditor<ArraySafePluginCustomTypes>
    /**
     * Executes the plugin on the `editor` with every one of the
     * `pluginFunctions` to get the `pluginObject`
     */
    const plugins = pluginConfigs.map((pluginConfig) => pluginConfig(editor))

    editor.isInline = createIsInline(editor.isInline, plugins)

    const renderElements = createRenderElements(plugins)
    const renderLeaves = createRenderLeaf(plugins)

    sinkEditor.sink = {
      plugins: plugins,
      renderElements,
      renderLeaves,
    }
    return sinkEditor
  }

  /**
   * Make sure to have the editor as part of the context because we will use
   * it in Editable
   */
  const SinkSlate = (props: Parameters<typeof Slate>[0]) => {
    return <Slate {...props} />
  }
  /**
   * In Editable, we use the Slate context to grab the right things from
   * the editor.
   */
  const SinkEditable = (originalProps: Parameters<typeof Editable>[0]) => {
    const { sink } = useSlateStatic() as unknown as SinkEditor

    /**
     * Create the substituted `renderElement` method.
     *
     * Generally, we are looking for the first result from any plugin or on
     * SinkEditable and return the first one that returns a value only.
     */
    const nextRenderElement = (renderElementProps: RenderElementProps) => {
      /**
       * Iterate over all the plugin `renderElement`. If they return nothing
       * then we go to the next one until we hit a result. If we don't hit a
       * result, then we go to the `renderElement` passed to the `SinkEditable`
       * component.
       */
      for (const renderElement of sink.renderElements) {
        const result = renderElement(renderElementProps)
        if (result) return result
      }
      if (originalProps.renderElement === undefined) {
        throw new Error(
          `Element with type ${renderElementProps.element.type} not handled. Note that renderElement is not defined on SinkEditable so this is only the result of checking the Sink Plugins.`
        )
      }
      return originalProps.renderElement(renderElementProps)
    }

    /**
     * Create the substituted `renderLeaf` method.
     *
     * Generally, we are looking for all the results from all the plugins and
     * SinkEditable and merge the results together by nesting the responses
     * starting from the first plugin on the outside to the `renderLeaf` method
     * on `SinkEditable` on the inside.
     */
    const nextRenderLeaf = (renderLeafProps: RenderLeafProps) => {
      if (originalProps.renderLeaf === undefined) {
        throw new Error(`renderLeaf was not defined on SinkEditable`)
      }
      let value = originalProps.renderLeaf({
        ...renderLeafProps,
        attributes: {} as RenderLeafProps["attributes"],
      })
      for (const renderLeaf of sink.renderLeaves) {
        const possibleValue = renderLeaf({
          ...renderLeafProps,
          children: value,
        })
        if (possibleValue) {
          value = possibleValue
        }
      }
      value = cloneElement(value, renderLeafProps.attributes) //{ key: 'your-unique-key-here' })
      return value
    }
    return (
      <Editable
        {...originalProps}
        renderElement={nextRenderElement}
        renderLeaf={nextRenderLeaf}
      />
    )
  }

  const returnValue = { withSink, SinkSlate, SinkEditable }
  return returnValue as {
    PluginFunctions: F
  } & typeof returnValue
}
