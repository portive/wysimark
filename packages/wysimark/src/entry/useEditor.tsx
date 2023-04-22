import { useState } from "react"
import { createEditor, Editor, Transforms } from "slate"
import { withHistory } from "slate-history"
import { ReactEditor, withReact } from "slate-react"

import { parse, serialize } from "../../../convert/src"
import { Element, withSink, WysimarkEditor } from "./SinkEditable"

export function useEditor({
  initialMarkdown = "",
  uploadAuthToken,
  height,
  minHeight,
  maxHeight,
}: {
  initialMarkdown?: string
  uploadAuthToken?: string
  height?: string | number
  minHeight?: string | number
  maxHeight?: string | number
}): Editor & ReactEditor & WysimarkEditor {
  const [editor] = useState(() => {
    const editor = createEditor()
    const nextEditor = withSink(withReact(withHistory(editor)), {
      upload: { authToken: uploadAuthToken },
      image: {},
      toolbar: { height, minHeight, maxHeight },
    })
    nextEditor.convertElement.addConvertElementType("paragraph")
    editor.wysimark = {
      initialMarkdown,
      initialValue: parse(initialMarkdown),
    }
    editor.getMarkdown = () => {
      return serialize(editor.children as Element[])
    }
    editor.resetMarkdown = (markdown: string) => {
      const documentValue = parse(markdown)
      editor.children = documentValue
      editor.selection = null
      Transforms.select(editor, Editor.start(editor, [0]))
    }
    return nextEditor
  })

  return editor
}
