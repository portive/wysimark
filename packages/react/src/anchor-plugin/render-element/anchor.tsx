import { clsx } from "clsx"
import { useEffect, useRef } from "react"
import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { useUpload } from "../../upload-plugin/store"
import { useLayer } from "../../use-layer"
import { AnchorElement } from "../index"
import { $Anchor, $Edge } from "../styles"
import { AnchorDialog } from "./AnchorDialog"
import { ProgressBar } from "./ProgressBar"

export function Anchor({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<AnchorElement>) {
  const startEdgeRef = useRef<HTMLSpanElement>(null)
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const selected = useSelected()
  const upload = useUpload(element.href)
  const dialog = useLayer("dialog")

  /**
   * TODO:
   *
   * Finish implementing the anchor dialog.
   *
   * Stopped partway through because the entire document is being re-rendered
   * on every keypress.
   */

  useEffect(() => {
    const anchor = anchorRef.current
    const startEdge = startEdgeRef.current
    if (!anchor || !startEdge) return
    if (selected) {
      dialog.open(() => (
        <AnchorDialog
          destAnchor={anchor}
          destStartEdge={startEdge}
          element={element}
        />
      ))
    } else {
      dialog.close()
    }
    return () => {
      console.log("teardown anchor")
    }
  }, [selected, element])

  return (
    <$Anchor
      className={clsx({ "--selected": selected })}
      href={element.href}
      target={element.target}
      {...attributes}
      ref={anchorRef}
    >
      {/* Edge allow Chrome to differentiate in/out of the link */}
      <$Edge ref={startEdgeRef} contentEditable={false} />
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
