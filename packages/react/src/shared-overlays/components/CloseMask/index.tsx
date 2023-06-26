import React, { useRef } from "react"

import { $CloseMask } from "../../styles/$CloseMask"

/**
 * Add this `CloseMask` before the Component you want this `CloseMask` to be
 * the background for.
 *
 * When users click on the `CloseMask`, it will close the layer.
 */
export function CloseMask({ close }: { close: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  return <$CloseMask ref={ref} onClick={close} />
}
