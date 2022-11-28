import React, { useState } from "react"
import { BaseEditor, BaseText, createEditor, Text } from "slate"
import { withReact } from "slate-react"

import { createSink } from "../create-sink"
import { ArraySafePluginCustomTypes, ExtractCustomTypes } from "../types"
import {
  AnchorElement,
  anchorPlugin,
  AnchorPluginCustomTypes,
} from "./anchor-plugin"
import { boldPlugin, BoldPluginCustomTypes, BoldText } from "./bold-plugin"
import { initialValue } from "./initial-value"

/**
 * TODO:
 * `anchorPlugin` and `boldPlugin` conflict
 */
const mySink = createSink([anchorPlugin, boldPlugin])

type PluginCustomTypes = ExtractCustomTypes<typeof mySink>
type ParagraphElement = { type: "paragraph"; children: Text[] }

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & PluginCustomTypes["Editor"]
    Element: ParagraphElement | AnchorElement
    Text: BaseText & BoldText
  }
}

const Page = () => {
  const [editor] = useState(() => mySink.withEditor(withReact(createEditor())))
  return (
    <mySink.Slate editor={editor} value={initialValue}>
      <mySink.Editable />
    </mySink.Slate>
  )
}

export default Page
