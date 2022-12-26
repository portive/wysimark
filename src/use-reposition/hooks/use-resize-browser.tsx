import { useEffect } from "react"

import { useThrottledRefresh } from "./use-throttled-refresh"

/**
 * Refreshes the Component whenever the page is resized or the window is
 * scrolled. This is because these are usually the only two events that cause
 * the elements on a page to be repositioned.
 *
 * If there are yet other events that can cause the elements to be repositioned
 * or resized, you can also call the returned `refresh` method. This will
 * update the components while still respected the fact that the updates will
 * be throttled so as not to overload the browser.
 */
export function useResizeBrowser() {
  /**
   * Create a throttled `refresh` method.
   */
  const refresh = useThrottledRefresh()

  /**
   * refresh on page resize or scroll (throttled)
   */
  useEffect(() => {
    refresh()
    window.addEventListener("resize", refresh)
    return () => {
      window.removeEventListener("resize", refresh)
    }
  }, [])

  return refresh
}
