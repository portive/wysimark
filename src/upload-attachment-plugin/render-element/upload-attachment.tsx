import { clsx } from "clsx"
import prettyBytes from "pretty-bytes"
import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"
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
  return (
    <$UploadAttachment
      className={clsx({ "--selected": selected })}
      {...attributes}
      title={title}
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
