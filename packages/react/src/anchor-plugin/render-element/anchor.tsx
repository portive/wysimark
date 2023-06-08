import { clsx } from "clsx"
import { useRef } from "react"
import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { useUpload } from "../../upload-plugin/store"
import { AnchorElement } from "../index"
import { $Anchor, $Edge } from "../styles"
import { ProgressBar } from "./ProgressBar"

export function Anchor({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<AnchorElement>) {
  const anchorRef = useRef(null)
  const selected = useSelected()
  const upload = useUpload(element.href)

  return (
    <$Anchor
      className={clsx({ "--selected": selected })}
      href={element.href}
      target={element.target}
      {...attributes}
      ref={anchorRef}
    >
      {/* Edge allow Chrome to differentiate in/out of the link */}
      <$Edge contentEditable={false} />
      {upload?.status === "progress" ? (
        <ProgressBar
          anchorRef={anchorRef}
          progress={upload.sentBytes / upload.totalBytes}
        />
      ) : null}
      <span>{children}</span>
      {/* Edge allow Chrome to differentiate in/out of the link */}
      <$Edge contentEditable={false} />
    </$Anchor>
  )
}
