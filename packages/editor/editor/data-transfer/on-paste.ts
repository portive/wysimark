import isUrl from "is-url"
import pick from "lodash/pick"
import { Editor, Range, Transforms } from "slate"
import { stopEvent } from "~/lib/stop-event"
import * as Custom from "../custom"
import { MEDIA_REGEXPS } from "../render/render-element/media"

export function onPaste(e: React.ClipboardEvent, editor: Editor) {
  const x = pick(e, ["type", "clipboardData"])
  const { files, types } = e.clipboardData
  /**
   * Upload file
   */
  if (files.length > 0) {
    stopEvent(e)
    editor.upload(files)
    return true
  } else if (types.includes("text/plain")) {
    const text = x.clipboardData.getData("text/plain")
    if (!isUrl(text)) return false
    stopEvent(e)
    const isMedia = MEDIA_REGEXPS.some((re) => !!text.match(re))
    if (isMedia) {
      Custom.insertMedia(editor, text)
    } else {
      if (editor.selection && Range.isExpanded(editor.selection)) {
        Transforms.wrapNodes(
          editor,
          {
            type: "link",
            url: text,
            children: [],
          },
          { at: editor.selection, split: true }
        )
      } else {
        Custom.insertLink(editor, text, text)
      }
    }
    return true
  }
  return false
}
