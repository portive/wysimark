import throttle from "lodash.throttle"
import { useCallback, useEffect, useRef } from "react"
import { Descendant, Editor, Element, Transforms } from "slate"
import { ReactEditor, RenderLeafProps, Slate } from "slate-react"

import { parse, serialize } from "../convert"
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
  console.log("Editable render")

  const ignoreNextChangeRef = useRef(false)
  const initialValueRef = useRef<Descendant[]>()

  /**
   * Throttled version of `onChange` for the `Slate` component. This method gets
   * called on every change to the editor except for:
   *
   * - The first call to `onChange` when the component is mounted which would
   *   be in response to the initial normalization pass that is always run to
   *   make sure the content is in a good state.
   * - When the incoming value (markdown) to the editor is changed and we force
   *   the editor to update its value after doing a `parse` on the markdown.
   *   We don't want the `onChange` callback to be called for this because if
   *   the change came from an edit to a textarea, for example, it would
   *   serialize the editor and the value of the textarea would be updated with
   *   a slightly different value. This would cause the selection to jump. This
   *   is especially bad if the cursor is at the end of a line and the user
   *   presses the spacebar. This is because Markdown does not support spaces
   *   at the end of a line and the space would be removed and the cursor would
   *   have nowhere to be.
   */
  const onThrottledSlateChange = useCallback(
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
    [editor, onChange, throttleInMs]
  )

  /**
   * This handles the initial `onChange` event from the `Slate` component and
   * makes sure to ignore the change event after the initial normalization and
   * after the user sets the value of the editor directly.
   *
   * If it's neither, then it passes the call to the throttled `onChange` method.
   */
  const onSlateChange = useCallback(() => {
    if (ignoreNextChangeRef.current) {
      ignoreNextChangeRef.current = false
      return
    }
    onThrottledSlateChange()
  }, [onThrottledSlateChange])

  /**
   * Handle the initial mounting of the component where `prevValue` would not
   * have been set yet.
   */
  if (editor.wysimark.prevValue == null) {
    ignoreNextChangeRef.current = true
    const children = parse(value)
    initialValueRef.current = children
    editor.wysimark.prevValue = {
      markdown: value,
      children,
    }
  } else {
    /**
     * Handle the case where the `value` differs from the last `markdown` value
     * set in the Wysimark editor. If it differs, that means the change came
     * from somewhere else and we need to set the editor value.
     *
     * Apart from setting `editor.children` we also need to set the selection
     * to the start of the document. This is because the selection may be set
     * to an invalid value based on the new document value.
     */
    if (value !== editor.wysimark.prevValue.markdown) {
      ignoreNextChangeRef.current = true
      const documentValue = parse(value)
      editor.children = documentValue
      editor.selection = null
      Transforms.select(editor, Editor.start(editor, [0]))
    }
  }

  const onSinkeEditableMouseDown = useCallback(() => {
    /**
     * For some reason, Firefox doesn't focus the editor when clicking on
     * it until the second try. This is a workaround for that.
     * Handled narrowly to avoid potentially breaking other browsers.
     */
    if (navigator.userAgent.toLowerCase().includes("firefox")) {
      ReactEditor.focus(editor)
    }
  }, [editor])

  /**
   * When the user exits the editor, we want to call the `onChange` callback
   * immediately.
   */
  const onBlur = useCallback(() => {
    console.log("onBlur")
    onThrottledSlateChange.flush()
  }, [onThrottledSlateChange])

  useEffect(() => {
    console.log("Editable mount")
    return () => {
      console.log("Editable unmount")
    }
  }, [
    Slate,
    SinkEditable,
    initialValueRef.current,
    editor,
    onSlateChange,
    renderLeaf,
    onSinkeEditableMouseDown,
    onBlur,
    placeholder,
    className,
    style,
  ])

  return (
    <Slate
      editor={editor}
      /* NOTE: This is the initial value even though it is named value */
      value={initialValueRef.current!}
      onChange={onSlateChange}
    >
      <SinkEditable
        renderLeaf={renderLeaf}
        onMouseDown={onSinkeEditableMouseDown}
        onBlur={onBlur}
        placeholder={placeholder}
        className={className}
        style={style}
      />
    </Slate>
  )
}
