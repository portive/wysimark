import React, { useState } from "react"
import { createEditor } from "slate"
import { Editable, Slate, withReact } from "slate-react"

import { createSink } from "../create-sink"
import { anchorPlugin } from "./anchor-plugin"
import { boldPlugin } from "./bold-plugin"
import { initialValue } from "./initial-value"

/**
 * TODO:
 * `anchorPlugin` and `boldPlugin` conflict
 */
const Sink = createSink([anchorPlugin, boldPlugin])

const Page = () => {
  const [editor] = useState(() => Sink.withEditor(withReact(createEditor())))
  return (
    <Sink.Slate editor={editor} value={initialValue}>
      <Sink.Editable />
    </Sink.Slate>
  )
}

export default Page
