import { useMemo, useState } from "react"
import { createEditor, Descendant, Editor, Transforms } from "slate"
import { withHistory } from "slate-history"
import { withReact } from "slate-react"

import { parse, serialize } from "../../../convert/src"
import { Element, withSink } from "./SinkEditable"

export type UseWysimarkValue = {
  editor: Editor
  editorInitialValue: Descendant[]
  getValue: () => string
  resetValue: (value: string) => void
}

export function useEditor({
  initialValue,
  uploadAuthToken,
}: {
  initialValue: string
  uploadAuthToken?: string
}): UseWysimarkValue {
  const [editor] = useState(() => {
    const editor = createEditor()
    const nextEditor = withSink(withReact(withHistory(editor)), {
      upload: { authToken: uploadAuthToken },
      image: {},
    })
    nextEditor.convertElement.addConvertElementType("paragraph")
    return nextEditor
  })

  /**
   * Sets the initial value. This value should be set once and never changed.o
   *
   * After setting the value initially, if you need to programmatically change
   * the value, then use the `setValue` method.
   */
  const editorInitialValue = useMemo(() => {
    return parse(initialValue)
  }, [])

  const getValue = useMemo(() => {
    return () => {
      return serialize(editor.children as Element[])
    }
  }, [editor])

  const resetValue = useMemo(() => {
    return (value: string) => {
      const documentValue = parse(value)
      editor.children = documentValue
      editor.selection = null
      Transforms.select(editor, Editor.start(editor, [0]))
    }
  }, [editor])

  const wysimarkConfig = useMemo(() => {
    return { editor, editorInitialValue, getValue, resetValue }
  }, [editor, editorInitialValue])

  return wysimarkConfig
}
