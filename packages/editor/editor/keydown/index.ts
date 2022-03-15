import React from "react"
import { Editor } from "slate"
import { handleKeyDownCore } from "./handle-key-down-core"
import { handleKeyDownEnterAutocomplete } from "./handle-key-down-enter-autocomplete"
import { handleKeyDownEnterVoid } from "./handle-key-down-enter-void"
import { handleKeyDownInCodeBlock } from "./handle-key-down-in-code-block"
import { handleKeyDownSpaceAutocomplete } from "./handle-key-down-space-autocomplete"
import { handleKeyDownTable } from "./handle-key-down-table"
import { handleKeyDownUp } from "./handle-key-down-up"

export function onKeyDown(event: React.KeyboardEvent, editor: Editor) {
  if (handleKeyDownInCodeBlock(event, editor)) return
  if (handleKeyDownTable(event, editor)) return
  if (handleKeyDownSpaceAutocomplete(event, editor)) return
  if (handleKeyDownEnterVoid(event, editor)) return
  if (handleKeyDownEnterAutocomplete(event, editor)) return
  if (handleKeyDownCore(event.nativeEvent, editor)) return
  if (handleKeyDownUp(event, editor)) return
}
