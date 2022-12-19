import { useEffect } from "react"

import { useThrottledRefresh } from "./use-throttled-refresh"

export function useReposition() {
  /**
   * Create a throttled `refresh` method.
   */
  const refresh = useThrottledRefresh(250)

  /**
   * refresh on page resize or scroll (throttled)
   */
  useEffect(() => {
    window.addEventListener("resize", refresh)
    window.addEventListener("scroll", refresh)
    return () => {
      window.removeEventListener("resize", refresh)
      window.removeEventListener("scroll", refresh)
    }
  })

  return refresh
}
