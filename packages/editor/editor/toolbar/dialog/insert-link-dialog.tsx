import isUrl from "is-url"
import React, { useRef } from "react"
import { Editor, Transforms } from "slate"
import { ReactEditor } from "slate-react"
import { Form } from "~/lib/form"
import { useInModal } from "~/lib/modal"
import { Dialog } from "~/lib/modals/dialog"
import { useForm } from "~/lib/use-form"
import * as Custom from "../../custom"

/**
 * Insert Link Dialog
 */

export function InsertLinkDialog({
  dest,
  editor,
}: {
  dest: HTMLElement
  editor: Editor
}) {
  const modal = useInModal()
  /**
   * We use a refer so that we only calculate the linkInfo at the time the
   * dialog is called. If we call it later, the selection will have changed
   * and we won't have the right information.
   */
  const linkInfoRef = useRef(Custom.getLinkInfo(editor))
  const linkInfo = linkInfoRef.current
  const form = useForm(() => ({ url: linkInfo.url, label: linkInfo.text }))
  const urlField = form.field("url")
  const labelField = form.field("label")

  function submit() {
    form.submit(async ({ url, label }) => {
      /**
       * If there is no URL, close the insert link dialog.
       */
      if (url.length === 0) {
        modal.close()
        return
      }
      /**
       * If there is a URL but it is invalid, ask user to enter a valid URL
       */
      if (!isUrl(url)) {
        urlField.setFault("Please enter a valid URL")
        return
      }
      /**
       * If the label is empty, we use the URL
       */
      const labelToInsert = label.length === 0 ? url : label

      ReactEditor.focus(editor)
      Transforms.select(editor, linkInfo.range)
      Custom.insertLink(editor, url, labelToInsert)
      modal.close()
    })
  }

  const title = linkInfo.text.length > 0 ? "Edit link" : "Insert link"

  return (
    <Dialog title={title} dest={dest} width={320}>
      <Form.Block label="URL" fault={urlField.fault}>
        <Form.Input
          value={urlField.value}
          onChange={urlField.onChange}
          onSubmit={submit}
          autoFocus={true}
        />
      </Form.Block>
      <Form.Block label="Link text" fault={labelField.fault}>
        <Form.Input
          value={labelField.value}
          onChange={labelField.onChange}
          onSubmit={submit}
          placeholder="Use URL above when empty"
        />
      </Form.Block>
      <Form.Block>
        <Form.Button onClick={submit}>
          <i className="fa fa-link" />
          Insert Link
        </Form.Button>
      </Form.Block>
    </Dialog>
  )
}
