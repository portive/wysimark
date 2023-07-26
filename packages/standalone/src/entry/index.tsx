import {
  createRef,
  RefObject,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { createRoot } from "react-dom/client"

import { Editable, useEditor } from "../../../react/src/entry"

/**
 * The options passed into the standalone version of Wysimark.
 */
type StandaloneOptions = Parameters<typeof useEditor>[0] & {
  onChange?: (markdown: string) => void
  placeholder?: string
  initialMarkdown?: string
}

type StandaloneMethods = {
  getMarkdown: () => string
  setMarkdown: (markdown: string) => void
}

/**
 * The object returned by `createWysimark`
 */
export type Wysimark = {
  unmount: () => void
  getMarkdown: () => string
  setMarkdown: (markdown: string) => void
}

function StandaloneEditor({
  standaloneOptions: { onChange, placeholder, ...options },
  standaloneMethodsRef,
}: {
  standaloneOptions: StandaloneOptions
  standaloneMethodsRef: RefObject<StandaloneMethods>
}) {
  const [markdown, setMarkdown] = useState(options.initialMarkdown || "")
  const markdownRef = useRef(markdown)
  const editor = useEditor(options)

  markdownRef.current = markdown

  useImperativeHandle(
    standaloneMethodsRef,
    () => {
      return {
        getMarkdown() {
          return markdownRef.current
        },
        setMarkdown(markdown: string) {
          markdownRef.current = markdown
          setMarkdown(markdown)
        },
      }
    },
    [markdownRef, setMarkdown]
  )

  const onChangeEditable = useCallback(
    (markdown: string) => {
      /**
       * Setting the ref is important in the case where there is an attempt to
       * call the `getMarkdown` method from `onChange`. Otherwise the `ref`
       * doesn't get updated until the next render which happens sometime after
       * the `onChange` callback is called.
       */
      markdownRef.current = markdown
      setMarkdown(markdown)
      onChange?.(markdown)
    },
    [editor]
  )

  return (
    <Editable
      editor={editor}
      value={markdown}
      onChange={onChangeEditable}
      placeholder={placeholder}
    />
  )
}

/**
 * The primary entry point for the standalone version of Wysimark.
 */
export function createWysimark(
  containerElement: HTMLElement,
  options: StandaloneOptions
): Wysimark {
  const standaloneMethodsRef = createRef<StandaloneMethods>()

  const root = createRoot(containerElement)

  root.render(
    <StandaloneEditor
      standaloneMethodsRef={standaloneMethodsRef}
      standaloneOptions={options}
    />
  )

  return {
    unmount() {
      try {
        root.unmount()
      } catch (e) {
        /* ignore */
      }
    },
    getMarkdown() {
      return standaloneMethodsRef.current?.getMarkdown() || ""
      // const markdown = editorRef.current?.getMarkdown()
      // return typeof markdown === "string"
      //   ? markdown
      //   : options.initialMarkdown || ""
    },
    setMarkdown(markdown: string) {
      standaloneMethodsRef.current?.setMarkdown(markdown)
    },
  }
}
