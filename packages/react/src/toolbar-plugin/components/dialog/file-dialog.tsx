import { useRef } from "react"
import { useSlateStatic } from "slate-react"

import { CloseMask } from "~/src/shared-overlays"
import { stopEvent } from "~/src/sink"
import { positionInside, useAbsoluteReposition } from "~/src/use-reposition"

import * as Icon from "../../icons"
import { $DialogButton, $DialogHint } from "../../styles/dialog-shared-styles"
import { $FileDialog } from "../../styles/file-dialog-styles"

export function FileDialog({
  dest,
  close,
  icon,
  buttonCaption,
  buttonHint,
}: {
  dest: HTMLElement
  close: () => void
  icon: React.ReactNode
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
            {icon}

            <span style={{ marginLeft: "0.5em" }}>{buttonCaption}</span>
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
      icon={<Icon.FileUpload />}
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
      icon={<Icon.PhotoUp />}
      buttonCaption="Select images..."
      buttonHint="Select image files to insert"
    />
  )
}
