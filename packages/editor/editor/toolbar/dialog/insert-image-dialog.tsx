import React from "react"
import { Editor } from "slate"
import { Form } from "~/lib/form"
import { Dialog } from "~/lib/modals/dialog"

/**
 * Insert image dialog
 *
 */

function InsertImageDialog({
  dest,
  editor,
}: {
  dest: HTMLElement
  editor: Editor
}) {
  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files == null || e.target.files.length === 0) return
    editor.upload(e.target.files)
  }

  return (
    <Dialog title="Insert image" dest={dest} width={320}>
      <Form.Block
        label="Select image file to upload"
        hint="Works with .gif, .jpg/.jpeg and .png"
      >
        <Form.File onChange={onChange}>
          <i className="fa fa-upload" /> Upload Image
        </Form.File>
      </Form.Block>
    </Dialog>
  )
}

export { InsertImageDialog }
