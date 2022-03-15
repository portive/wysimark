import { useRef } from "react"
import { Editor, createEditor } from "slate"
import { withHistory } from "slate-history"
import { withReact } from "slate-react"
import { shallowEquals } from "~/lib/shallow-equals"
import { withNormalize } from "../normalize"
import { UseEditorProps } from "../types"
import { withUpload } from "../upload"
import { withDelete } from "./delete"
import { withInsertBreak } from "./insert-break"
import { withActiveImage } from "./with-create-active-image/with-active-image"
import { withElementTypeMethods } from "./with-element-types"
import { withGetMarkdown } from "./with-get-markdown"

/**
 * NOTE:
 *
 * This is the main entry point for creating an editor for unit testing.
 * It does not include the props from `UseEditorProps` but otherwise has all
 * the functions of the editor which can be useful for testing.
 *
 * WARNING:
 * Do not refactor `withEditor` into `useEditor`. It is required for unit tests.
 *
 * Adds properties to Editor to customize its behavior
 *
 * - Custom Normalizer
 * - Custom Uploader
 * - Custom Props
 *
 * Plus Slate plugins
 *
 * - Slate History
 * - Slate React
 */
export function withEditor(editor: Editor): Editor {
  editor = withReact(editor)
  editor = withHistory(editor)
  editor = withNormalize(editor)
  editor = withUpload(editor)
  editor = withInsertBreak(editor)
  editor = withDelete(editor)
  editor = withElementTypeMethods(editor)
  editor = withGetMarkdown(editor)
  editor = withActiveImage(editor, [
    "https://dev-files.wysimark.com/f/",
    "https://files.wysimark.com/f/",
  ])
  return editor
}

/**
 * WARNING:
 * Do not refactor `withEditor` into `useEditor`. It is required for unit tests.
 */
export function useEditor(
  {
    initialMarkdown,
    upload = {
      type: "demo",
      url: "https://app.wysimark.com/api/v1/upload/demo",
    },
  }: UseEditorProps,
  deps: any[] = []
) {
  const depsRef = useRef<any[]>([])
  /**
   * IMPORTANT!
   *
   * We use a `ref` instead of `useMemo` due to an issue with fast refreshing
   * as described in this Slate issue.
   *
   * <https://github.com/ianstormtaylor/slate/issues/4081>
   *
   * Slate expects the Editor object to be the same and if it isn't, throws an
   * error like:
   *
   * `Error: Cannot find a descendant at path [0] in node`
   *
   * The documentation uses `useMemo` but that's not reliable on NextJS with
   * live reloading which, I assume, is similar to CRA live-reload as mentioned
   * in the issue.
   */
  // IMPORTANT! Must be `useRef` not `useMemo`. See above.
  const editorRef = useRef<Editor>()
  if (
    !editorRef.current ||
    (editorRef.current && !shallowEquals(depsRef.current, deps))
  ) {
    const editor = withEditor(createEditor())
    editor.initialMarkdown = initialMarkdown
    editorRef.current = editor
    depsRef.current = deps
  }
  /**
   * We want to change these values live in our demo. Since it doesn't affect
   * the content, we can change these references and the next time the user
   * tries to upload, it will get these new values.
   *
   * If we try and swap them and create a new Editor, we get problems.
   */
  editorRef.current.uploadOptions = upload
  return editorRef.current
}
