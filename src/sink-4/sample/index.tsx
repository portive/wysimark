import React, { useState } from "react"
import { BaseEditor, BaseText, createEditor, Text } from "slate"
import { withReact } from "slate-react"
import { UnionToIntersection } from "type-fest"

import { createSink } from "../create-sink"
import {
  ArraySafePluginCustomTypes,
  ExtractCustomTypes,
  PluginCustomTypes,
} from "../types"
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

type AllPluginCustomTypes = AnchorPluginCustomTypes | BoldPluginCustomTypes

type MergePluginCustomTypes<
  T extends PluginCustomTypes<ArraySafePluginCustomTypes>
> = {
  Editor: UnionToIntersection<T["Editor"]>
  Element: T["Element"]
  Text: UnionToIntersection<T["Text"]>
}

type CT = MergePluginCustomTypes<AllPluginCustomTypes>

// type PluginCustomTypes = ExtractCustomTypes<typeof mySink>
// type ParagraphElement = { type: "paragraph"; children: Text[] }

/**
 * NOTE: As of THIS version, we couldn't get CustomTypes to work because of a
 * circular reference.
 *
 * In sink-4 we'll explore seeing if we can find another way to avoid this
 * but it may be well impossible.
 */
declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & CT["Editor"]
    Element: CT["Element"]
    Text: CT["Text"]
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
