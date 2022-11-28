import React, { useState } from "react"
import { createEditor } from "slate"
import { Editable, Slate, withReact } from "slate-react"
import { UnionToIntersection } from "type-fest"

import {
  ExtractCustomTypesFromPluginFunctions,
  OExtractCustomTypes,
  OExtractEditor,
} from "../create-plugin"
import { createSink } from "../create-sink"
import { anchorPlugin } from "./anchor-plugin"
import { boldPlugin } from "./bold-plugin"
import { initialValue } from "./initial-value"

/**
 * TODO:
 * `anchorPlugin` and `boldPlugin` conflict
 */
const Sink = createSink([anchorPlugin, boldPlugin])

type X1 = typeof Sink
type PluginFunctions = typeof Sink["PluginFunctions"]
type PluginFunction = PluginFunctions[number]
type PluginObject = ReturnType<PluginFunction>
type Editor = OExtractEditor<PluginObject>

type CustomTypes = OExtractCustomTypes<ReturnType<PluginFunctions[number]>>

const Page = () => {
  const [editor] = useState(() => Sink.withEditor(withReact(createEditor())))
  return (
    <Sink.Slate editor={editor} value={initialValue}>
      <Sink.Editable />
    </Sink.Slate>
  )
}

export default Page
