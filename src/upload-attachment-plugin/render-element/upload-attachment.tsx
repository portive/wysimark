import { clsx } from "clsx"
import prettyBytes from "pretty-bytes"
import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps, stopEvent } from "~/src/sink"
import { useUpload } from "~/src/upload-plugin/store"

import { UploadAttachmentElement } from ".."
import { $UploadAttachment } from "../styles"
import { DownloadIcon, PaperclipIcon, RefreshIcon } from "./icons"

function getTitleFromElement(element: UploadAttachmentElement) {
  const ext = element.title.split(".").pop()
  const titleParts = [`${ext?.toUpperCase()} attachment`]
  if (element.bytes) titleParts.push(prettyBytes(element.bytes))
  return titleParts.join(", ")
}

export function UploadAttachment({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<UploadAttachmentElement>) {
  const selected = useSelected()
  const upload = useUpload(element.url)
  const title = getTitleFromElement(element)

  const background =
    upload.status === "progress"
      ? `linear-gradient(90deg, white, white ${
          (100 * upload.sentBytes) / upload.totalBytes
        }%, var(--shade-200) ${(100 * upload.sentBytes) / upload.totalBytes}%)`
      : undefined
  return (
    <$UploadAttachment
      className={clsx({ "--selected": selected })}
      {...attributes}
      title={title}
      style={{ background }}
      draggable
    >
      <div className="--flex" contentEditable={false}>
        <span className="--paperclip">
          <PaperclipIcon />
        </span>
        <span className="--title">{element.title}</span>
        {upload.status === "progress" ? (
          <span className="--progress">
            <RefreshIcon />
          </span>
        ) : (
          <a
            className="--download"
            target="_blank"
            href={upload.url}
            rel="noreferrer"
          >
            <DownloadIcon />
          </a>
        )}
      </div>
      {children}
    </$UploadAttachment>
  )
}
