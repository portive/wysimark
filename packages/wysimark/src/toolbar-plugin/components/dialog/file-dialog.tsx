import { useRef } from "react"
import { useSlateStatic } from "slate-react"

import { stopEvent } from "../../../sink"
import { positionInside, useAbsoluteReposition } from "../../../use-reposition"
import * as Icon from "../../icons"
import { $DialogButton, $DialogHint } from "../../styles/dialog-shared-styles"
import { $FileDialog } from "../../styles/file-dialog-styles"
import { CloseMask } from "../shared/close-mask"

export function FileDialog({
  dest,
  close,
  buttonCaption,
  buttonHint,
}: {
  dest: HTMLElement
  close: () => void
  buttonCaption: string
  buttonHint: string
}) {
  const editor = useSlateStatic()
  const ref = useRef<HTMLDivElement>(null)
  const style = useAbsoluteReposition(
    { src: ref, dest },
    ({ src, dest }, viewport) => {
      return positionInside(
        src,
        viewport,
        {
          left: dest.left - 16,
          top: dest.top + dest.height,
        },
        { margin: 16 }
      )
    }
  )

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files == null || e.target.files.length === 0) return
    stopEvent(e)
    const { files } = e.target
    for (const file of files) {
      editor.upload.upload(file)
    }
    close()
  }

  return (
    <>
      <CloseMask close={close} />
      <$FileDialog ref={ref} style={style}>
        <label>
          <input
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={onChange}
          />
          <$DialogButton>
            <span style={{ marginRight: "0.5em" }}>{buttonCaption}</span>
            <Icon.Upload />
          </$DialogButton>
        </label>
        <$DialogHint>{buttonHint}</$DialogHint>
      </$FileDialog>
    </>
  )
}

export function AttachmentDialog({
  dest,
  close,
}: {
  dest: HTMLElement
  close: () => void
}) {
  return (
    <FileDialog
      dest={dest}
      close={close}
      buttonCaption="Select files..."
      buttonHint="Select files to insert as attachments"
    />
  )
}

export function ImageDialog({
  dest,
  close,
}: {
  dest: HTMLElement
  close: () => void
}) {
  return (
    <FileDialog
      dest={dest}
      close={close}
      buttonCaption="Select image files..."
      buttonHint="Select images to insert"
    />
  )
}
