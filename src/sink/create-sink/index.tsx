import React, { cloneElement, useEffect } from "react"
import { BaseEditor, BaseElement, Editor, NodeEntry, Path, Range } from "slate"
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  useSlateStatic,
} from "slate-react"

import {
  ArraySafePluginCustomTypes,
  PluginFunction,
  SinkEditor,
} from "../types"
import { $Editable, GlobalStyles } from "./$editable"
import { createBooleanAction, createVoidAction } from "./editor-methods"
// import { Reset } from "./reset"

export {}

/**
 * A sink is just a function
 */
export const createSink = (
  pluginConfigs: PluginFunction<ArraySafePluginCustomTypes>[]
) => {
  /**
   * The `editor` in the props can be a `BaseEditor` but we transform it
   * into a `SinkEditor` before returning it.
   */
  const withSink = <E extends BaseEditor>(
    originalEditor: E
  ): E & SinkEditor<ArraySafePluginCustomTypes> => {
    const editor = originalEditor as E & SinkEditor<ArraySafePluginCustomTypes>

    /**
     * Create the default for SinkEditor methods if they don't already exist.
     */
    editor.isMaster = "isMaster" in editor ? editor.isMaster : () => false
    editor.isConvertible =
      "isConvertible" in editor ? editor.isConvertible : () => false
    editor.isSlave = "isSlave" in editor ? editor.isSlave : () => false
    editor.isStandalone =
      "isStandalone" in editor ? editor.isStandalone : () => false

    /**
     * Executes the plugin on the `editor` with every one of the
     * `pluginFunctions` to get the `pluginObject`
     */
    const plugins = pluginConfigs.map((pluginConfig) => pluginConfig(editor))

    Object.assign(editor, {
      normalizeNode: createVoidAction(editor, "normalizeNode", plugins),
      deleteBackward: createVoidAction(editor, "deleteBackward", plugins),
      deleteForward: createVoidAction(editor, "deleteForward", plugins),
      deleteFragment: createVoidAction(editor, "deleteFragment", plugins),
      insertBreak: createVoidAction(editor, "insertBreak", plugins),
      insertFragment: createVoidAction(editor, "insertFragment", plugins),
      insertNode: createVoidAction(editor, "insertNode", plugins),
      insertText: createVoidAction(editor, "insertText", plugins),
      isInline: createBooleanAction(editor, "isInline", plugins),
      isVoid: createBooleanAction(editor, "isVoid", plugins),
      isMaster: createBooleanAction(editor, "isMaster", plugins),
      isConvertible: createBooleanAction(editor, "isConvertible", plugins),
      isSlave: createBooleanAction(editor, "isSlave", plugins),
      isStandalone: createBooleanAction(editor, "isStandalone", plugins),
    })

    editor.sink = {
      plugins: plugins,
      pluginsFor: {
        decorate: plugins.filter((plugin) => plugin.editableProps?.decorate),
        onKeyDown: plugins.filter((plugin) => plugin.editableProps?.onKeyDown),
        onKeyPress: plugins.filter(
          (plugin) => plugin.editableProps?.onKeyPress
        ),
        onKeyUp: plugins.filter((plugin) => plugin.editableProps?.onKeyUp),
        renderElement: plugins.filter(
          (plugin) => plugin.editableProps?.renderElement
        ),
        renderLeaf: plugins
          .filter((plugin) => plugin.editableProps?.renderLeaf)
          .reverse(),
      },
    }
    return editor
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
    const editor = useSlateStatic() as unknown as Editor & SinkEditor
    const { sink } = editor

    /**
     * We ask Slate to normalize the editor once at the very start.
     *
     * This is helpful for plugins that need to store some useful state in the
     * document and to add or fix certain parts of the document. Not all of
     * these values are stored in the saved documents.
     *
     * Some examples:
     *
     * - inserting collapsible paragraphs between void components. These should
     *   not be saved.
     *
     * - Add column and row indexes to help with rendering which should not
     *   be saved.
     *
     * Ideally, we wouldn't have to do any of this but pragmatically, it is
     * the most performant route.
     *
     * Once we normalize the document once, the document is kept up to date
     * through regular normalizing steps that are more performance because
     * they only check changed nodes.
     */
    useEffect(() => {
      Editor.normalize(editor, { force: true })
    }, [])

    const decorate = (entry: NodeEntry): Range[] => {
      const ranges: Range[] = []
      for (const plugin of sink.pluginsFor.decorate) {
        const resultRanges = plugin.editableProps?.decorate?.(
          entry as [BaseElement, Path]
        )
        if (resultRanges === undefined) continue
        ranges.push(...resultRanges)
      }
      return ranges
    }

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
      // <Reset>
      <>
        <GlobalStyles />
        <$Editable
          {...originalProps}
          decorate={decorate}
          onKeyDown={nextOnKeyDown}
          renderElement={nextRenderElement}
          renderLeaf={nextRenderLeaf}
        />
      </>
      // </Reset>
    )
  }

  const returnValue = { withSink, SinkSlate, SinkEditable }
  return returnValue as {
    PluginFunctions: PluginFunction<ArraySafePluginCustomTypes>
  } & typeof returnValue
}
