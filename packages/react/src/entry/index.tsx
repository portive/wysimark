import throttle from "lodash.throttle"
import { useCallback, useRef } from "react"
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
  const ignoreNextChangeRef = useRef(false)

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
    [editor, onChange]
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

  /**
   * When the user exits the editor, we want to call the `onChange` callback
   * immediately.
   */
  const onBlur = useCallback(() => {
    onThrottledSlateChange.flush()
  }, [onThrottledSlateChange])

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
