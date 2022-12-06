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

export {}

/**
 * SinkEditor just adds a `sink` object where we drop all of our sink
 * related data on.
 */
type SinkEditor<T extends BasePluginCustomTypes = BasePluginCustomTypes> = {
  sink: {
    plugins: PluginObject<T>[]
    pluginsFor: {
      renderElement: PluginObject<T>[]
      renderLeaf: PluginObject<T>[]
      onKeyDown: PluginObject<T>[]
      onKeyPress: PluginObject<T>[]
      onKeyUp: PluginObject<T>[]
    }
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

    sinkEditor.sink = {
      plugins: plugins,
      pluginsFor: {
        renderElement: plugins.filter(
          (plugin) => plugin.editableProps?.renderElement
        ),
        renderLeaf: plugins
          .filter((plugin) => plugin.editableProps?.renderLeaf)
          .reverse(),
        onKeyDown: plugins.filter((plugin) => plugin.editableProps?.onKeyDown),
        onKeyPress: plugins.filter(
          (plugin) => plugin.editableProps?.onKeyPress
        ),
        onKeyUp: plugins.filter((plugin) => plugin.editableProps?.onKeyUp),
      },
    }
    return sinkEditor
  }

  /**
   * We aren't using this yet but better to have it in case we need to add
   * a React Context or something later on.
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
      for (const plugin of sink.pluginsFor.renderElement) {
        const result = plugin.editableProps?.renderElement?.(renderElementProps)
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
        /**
         * We override this because `attributes` should only appear on the
         * uppermost leaf element if there are several nested ones and it's
         * possible that this won't be the uppermost leaf.
         *
         * We add attributes back on at the very end so no need to worry if
         * we omit it here.
         */
        attributes: {} as RenderLeafProps["attributes"],
      })
      for (const plugin of sink.pluginsFor.renderLeaf) {
        const possibleValue = plugin.editableProps?.renderLeaf?.({
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

    const nextOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      for (const plugin of sink.pluginsFor.onKeyDown) {
        const result = plugin.editableProps?.onKeyDown?.(e)
        if (result) return
      }
      originalProps.onKeyDown?.(e)
    }

    return (
      <Editable
        {...originalProps}
        renderElement={nextRenderElement}
        renderLeaf={nextRenderLeaf}
        onKeyDown={nextOnKeyDown}
      />
    )
  }

  const returnValue = { withSink, SinkSlate, SinkEditable }
  return returnValue as {
    PluginFunctions: F
  } & typeof returnValue
}
