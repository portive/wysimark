import { clsx } from "clsx"
import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { UploadAttachmentElement } from ".."
import { $UploadAttachment } from "../styles"
import { DownloadIcon, PaperclipIcon } from "./icons"

export function UploadAttachment({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<UploadAttachmentElement>) {
  const selected = useSelected()
  return (
    <$UploadAttachment
      className={clsx({ "--selected": selected })}
      {...attributes}
      title="attachment, 46384 bytes, 640x480"
    >
      <div className="--flex" contentEditable={false}>
        <span className="--paperclip">
          <PaperclipIcon />
        </span>
        <span className="--title">{element.title}</span>
        <span className="--download">
          <DownloadIcon />
        </span>
      </div>
      {children}
    </$UploadAttachment>
  )
}
