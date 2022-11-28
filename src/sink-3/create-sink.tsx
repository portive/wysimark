import { BaseEditor } from "slate"
import { Editable, Slate, useSlateStatic } from "slate-react"

import {
  BasePluginFunction,
  PluginFunction,
  PluginObject,
} from "./create-plugin"
import { BasePluginCustomTypes } from "./types"

export {}

/**
 * SinkEditor just adds a `sink` object where we drop all of our sink
 * related data on.
 */
type SinkEditor<T extends BasePluginCustomTypes> = {
  sink: {
    pluginObjects: PluginObject<T>[]
  }
}

type PluginCustomTypeToExtend = {
  Name: string
  Editor: any
  Element: any
  Text: any
}

/**
 * A sink is just a function
 */
export const createSink = <F extends PluginFunction<PluginCustomTypeToExtend>>(
  plugins: F[]
) => {
  /**
   * The `editor` in the props can be a `BaseEditor` but we transform it
   * into a `SinkEditor` before returning it.
   */
  const withEditor = <E extends BaseEditor>(
    editor: E
  ): E & SinkEditor<PluginCustomTypeToExtend> => {
    const sinkEditor = editor as E & SinkEditor<PluginCustomTypeToExtend>
    const pluginObjects: PluginObject<PluginCustomTypeToExtend>[] = []
    /**
     * Executes the plugin on the `editor` with every one of the
     * `pluginFunctions` to get the `pluginObject`
     */
    for (const plugin of plugins) {
      const pluginObject = plugin(editor)
      pluginObjects.push(pluginObject)
    }
    sinkEditor.sink = {
      pluginObjects,
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
  const SinkEditable = (props: Parameters<typeof Editable>[0]) => {
    const editor = useSlateStatic()
    return <Editable {...props} />
  }

  return { withEditor, Slate: SinkSlate, Editable: SinkEditable }
}
