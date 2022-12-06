```typescript
import React, { useState } from "react"
import { BaseEditor, createEditor, Text } from "slate"
import { withReact } from "slate-react"

import { createSink } from "../create-sink"
import { SinkEditor, SinkElement, SinkText } from "../types"
import { anchorPlugin, AnchorPluginCustomTypes } from "./anchor-plugin"
import { boldPlugin, BoldPluginCustomTypes } from "./bold-plugin"
import { initialValue } from "./initial-value"

const MySink = createSink([anchorPlugin(), boldPlugin()])

type PluginTypes = AnchorPluginCustomTypes | BoldPluginCustomTypes

type ParagraphElement = { type: "paragraph"; children: Text[] }

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & SinkEditor<PluginTypes>
    Element: ParagraphElement | SinkElement<PluginTypes>
    Text: SinkText<PluginTypes>
  }
}

const Page = () => {
  const [editor] = useState(() => MySink.withEditor(withReact(createEditor())))
  return (
    <MySink.Slate editor={editor} value={initialValue}>
      <MySink.Editable />
    </MySink.Slate>
  )
}

export default Page
```
