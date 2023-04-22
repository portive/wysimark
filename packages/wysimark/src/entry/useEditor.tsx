import { useState } from "react"
import { createEditor, Editor, Transforms } from "slate"
import { withHistory } from "slate-history"
import { withReact } from "slate-react"

import { parse, serialize } from "../../../convert/src"
import { Element, withSink } from "./SinkEditable"

export function useEditor({
  initialMarkdown,
  uploadAuthToken,
}: {
  initialMarkdown: string
  uploadAuthToken?: string
}): Editor {
  const [editor] = useState(() => {
    const editor = createEditor()
    const nextEditor = withSink(withReact(withHistory(editor)), {
      upload: { authToken: uploadAuthToken },
      image: {},
    })
    nextEditor.convertElement.addConvertElementType("paragraph")
    editor.wysimark = {
      initialMarkdown,
      initialValue: parse(initialMarkdown),
    }
    console.log("wysimark", editor.wysimark)
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
