import throttle from "lodash.throttle"
import { useCallback } from "react"
import { Editor, Element, Transforms } from "slate"
import { RenderLeafProps, Slate } from "slate-react"

import { parse, serialize } from "../../../convert/src"
import { SinkEditable } from "./SinkEditable"

export type { Element, Text } from "./plugins"
export { useEditor } from "./useEditor"

function renderLeaf({ children, attributes }: RenderLeafProps) {
  return <span {...attributes}>{children}</span>
}

export type EditableProps = {
  // editor: BaseEditor & ReactEditor & HistoryEditor & SinkEditor & WysimarkEditor
  editor: Editor
  value: string
  onChange: (markdown: string) => void
  throttleInMs?: number
  placeholder?: string
  className?: string
  style?: React.CSSProperties
} // & Omit<React.TextareaHTMLAttributes<HTMLDivElement>, "onChange">

export function Editable({
  editor,
  value,
  onChange,
  throttleInMs = 1000,
  placeholder,
  className,
  style,
}: EditableProps) {
  const onSlateChange = useCallback(
    throttle(
      () => {
        const markdown = serialize(editor.children as Element[])
        editor.wysimark.prevValue = {
          markdown,
          children: editor.children,
        }
        onChange(markdown)
      },
      throttleInMs,
      { leading: false, trailing: true }
    ),
    [editor, onChange]
  )

  if (editor.wysimark.prevValue == null) {
    const children = parse(value)
    editor.wysimark.prevValue = {
      markdown: value,
      children,
    }
  } else {
    if (value !== editor.wysimark.prevValue.markdown) {
      const documentValue = parse(value)
      editor.children = documentValue
      editor.selection = null
      Transforms.select(editor, Editor.start(editor, [0]))
    }
  }

  const onBlur = useCallback(() => {
    onSlateChange.flush()
  }, [onSlateChange])

  return (
    <Slate
      editor={editor}
      value={editor.wysimark.prevValue.children}
      onChange={onSlateChange}
    >
      <SinkEditable
        renderLeaf={renderLeaf}
        onBlur={onBlur}
        placeholder={placeholder}
        className={className}
        style={style}
      />
    </Slate>
  )
}
