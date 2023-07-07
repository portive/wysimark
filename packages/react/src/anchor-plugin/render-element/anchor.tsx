import { clsx } from "clsx"
import { useEffect, useRef } from "react"
import { useFocused, useSelected } from "slate-react"

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
    /**
     * NOTE: Do not use `focused && selected` here because when we click or
     * focus on the pop up dialogs themselves, this will cause the dialogs to
     * close.
     *
     * TODO: Figure out how to make the dialogs not close when clicking on them.
     *
     * It has to support these use cases:
     *
     * - Closes when user clicks somewhere in the document outside the link
     * - Stays open when user clicks on the dialog
     * - Stays open when user is in an input in the dialog
     * - Closes when the editor loses focus but stays open when the editor loses
     *   focus to the anchor dialog or the anchor edit dialog
     */
    if (selected) {
      /**
       * The setTimeout delay is necessary when first clicking into the browser
       * and when switching from one link to another. Without it, the dialog
       * will not open.
       */
      setTimeout(() => {
        dialog.open(() => (
          <AnchorDialog
            destAnchor={anchor}
            destStartEdge={startEdge}
            element={element}
          />
        ))
      })
    } else {
      dialog.close()
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
