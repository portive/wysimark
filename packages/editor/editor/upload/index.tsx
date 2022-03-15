import { createRef } from "react"
import { Editor } from "slate"
import { Position } from "~/lib/modals/container"
import { UploadProgressDialog } from "./upload-progress-dialog"

/**
 * Adds a function `upload` to the Slate `editor` object.
 *
 * When initializing the `editor`, you should add the `withUpload` to enable
 * the upload function.
 */
export function withUpload(editor: Editor): Editor {
  /**
   * Create a `bodyRef` Ref that we can attach the Editor content body onto.
   */
  editor.containerRef = createRef<HTMLDivElement>()

  /**
   * Add an `upload` method onto the `Editor` instance.
   *
   * It takes a FileList (like an Array of File) and then starts uploading all
   * the files from it.
   *
   * It does this by opening a modal Dialog with the files attached. The
   * Dialog will iterate through each File, start the upload process on each
   * one of them, display a progress bar and then insert them into the document
   * when done.
   */
  editor.upload = function (files: FileList) {
    if (editor.containerRef == null) return
    if (editor.containerRef.current == null) {
      throw new Error(`editor.containerRef.current must be defined`)
    }

    editor.modalDialog.open(UploadProgressDialog, {
      editor,
      files,
      dest: editor.containerRef.current,
      position: Position.Inside,
    })
  }
  return editor
}
