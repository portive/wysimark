import { MouseEvent, useCallback } from "react"

import { useLayer } from "~/src/use-layer"

import { Tooltip } from "./tooltip"
import { Triangle } from "./triangle"

export function useTooltip(
  { title, hotkey }: { title: string; hotkey?: string },
  deps: React.DependencyList = []
) {
  const label = useLayer("tooltip-label")
  const triangle = useLayer("tooltip-triangle")

  /**
   * On hover
   */
  const onMouseEnter = useCallback((e: MouseEvent<HTMLElement>) => {
    const dest = e.currentTarget
    /**
     * Open tooltip
     */
    if (title !== undefined) {
      label.open(() => <Tooltip title={title} hotkey={hotkey} dest={dest} />)
      triangle.open(() => <Triangle dest={dest} />)
    }
  }, deps)

  const onMouseLeave = useCallback(() => {
    label.close()
    triangle.close()
  }, deps)
  return { onMouseEnter, onMouseLeave }
}
