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
  const ignoreNextChangeRef = useRef(false)

  /**
   * This is a temporary ref that is only used once to store the initial value
   * derived from the initial Markdown value.
   */
  const initialValueRef = useRef<Descendant[]>()

  /**
   *
   */
  const prevValueRef = useRef<Descendant[]>()

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
   * makes sure to ignore any change events that don't change the content of
   * the editor. For example, if the user just moves the cursor around, we
   * don't want to call the `onChange` callback.
   *
   * If it's neither, then it passes the call to the throttled `onChange` method.
   */
  const onSlateChange = useCallback(() => {
    if (prevValueRef.current === editor.children) {
      return
    }
    prevValueRef.current = editor.children
    onThrottledSlateChange()
  }, [onThrottledSlateChange])

  /**
   * Handle the initial mounting of the component. This is where we set the
   * initial value of the editor. We also set the `prevValue` on the editor
   * which is used to determine if a change in the editor resulted in a change
   * in the contents of the editor vs just changing the cursor position for
   * example.
   *
   * NOTE: This value hasn't been normalized yet.
   */
  if (editor.wysimark.prevValue == null) {
    ignoreNextChangeRef.current = true
    const children = parse(value)
    prevValueRef.current = initialValueRef.current = children
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
    onThrottledSlateChange.flush()
  }, [onThrottledSlateChange])

  /**
   * NOTE:
   *
   * The following code is used to see if we are getting unnecessary re-renders.
   *
   * Comment it out when we are happy.
   *
   * - We SHOULD see `Editable mount` on the initial render.
   * - We SHOULD NOT see `Editable mount` or unmount at each markdown update.
   */
  // useEffect(() => {
  //   console.log("Editable mount")
  //   return () => {
  //     console.log("Editable unmount")
  //   }
  // }, [
  //   Slate,
  //   SinkEditable,
  //   initialValueRef.current,
  //   editor,
  //   onSlateChange,
  //   renderLeaf,
  //   onSinkeEditableMouseDown,
  //   onBlur,
  //   placeholder,
  //   className,
  //   style,
  // ])

  if (!initialValueRef.current) {
    throw new Error("initialValueRef.current is null")
  }

  return (
    <Slate
      editor={editor}
      /* NOTE: This is the initial value even though it is named value */
      value={initialValueRef.current}
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
