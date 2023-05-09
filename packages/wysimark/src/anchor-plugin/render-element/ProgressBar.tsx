import { RefObject, useRef } from "react"

import { positionInside, useFixedReposition } from "../../use-reposition"
import { $ProgressBar, $ProgressBarFill } from "../styles"

export function ProgressBar({
  anchorRef,
  progress,
}: {
  // anchorRef: React.MutableRefObject<null>
  anchorRef: RefObject<HTMLAnchorElement>
  progress: number
}) {
  const progressRef = useRef(null)
  const rect = useFixedReposition(
    { anchor: anchorRef, progress: progressRef },
    (rects, viewport) => {
      if (rects.anchor == null || rects.progress == null) return { left: -1000 }
      return positionInside(rects.progress, viewport, {
        left: rects.anchor.left,
        top: rects.anchor.top + rects.anchor.height + 4,
      })
    }
  )
  return (
    <$ProgressBar ref={progressRef} style={rect}>
      <$ProgressBarFill style={{ width: progress * 100 }} />
    </$ProgressBar>
  )
}
