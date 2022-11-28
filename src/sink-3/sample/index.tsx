import React, { useState } from "react"
import { createEditor } from "slate"
import { withReact } from "slate-react"

import { createSink } from "../create-sink"
import { OExtractCustomTypes, OExtractEditor } from "../types"
import { anchorPlugin } from "./anchor-plugin"
import { boldPlugin } from "./bold-plugin"
import { initialValue } from "./initial-value"

/**
 * TODO:
 * `anchorPlugin` and `boldPlugin` conflict
 */
const mySink = createSink([anchorPlugin, boldPlugin])

type X1 = typeof mySink
type PluginFunctions = typeof mySink["PluginFunctions"]
type PluginFunction = PluginFunctions[number]
type PluginObject = ReturnType<PluginFunction>
type Editor = OExtractEditor<PluginObject>

type CustomTypes = OExtractCustomTypes<ReturnType<PluginFunctions[number]>>

const Page = () => {
  const [editor] = useState(() => mySink.withEditor(withReact(createEditor())))
  return (
    <mySink.Slate editor={editor} value={initialValue}>
      <mySink.Editable />
    </mySink.Slate>
  )
}

export default Page
