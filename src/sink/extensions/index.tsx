import { BaseEditor } from "slate"

import { ArraySafePluginCustomTypes, PluginObject, SinkEditor } from "../types"
import { EditorExtension } from "./editor-extension"

export type Extension = {
  extendEditor?: (
    editor: BaseEditor & SinkEditor<ArraySafePluginCustomTypes>,
    plugins: PluginObject<ArraySafePluginCustomTypes>[]
  ) => void
}

export const extensions: Extension[] = [EditorExtension]
