import throttle from "just-throttle"
import { useState } from "react"

/**
 * Creates a hook that rerenders a component when the returned `refresh`
 * method is called; however, it throttles the refresh based on the
 * `intervalInMs` argument passed in.
 *
 * This is a useful component used when throttling reposition updates.
 */
export function useThrottledRefresh(intervalInMs = 100) {
  const [counter, setState] = useState(0)
  const refresh = throttle(
    () => {
      setState((counter) => counter + 1)
    },
    intervalInMs,
    { trailing: true }
  )
  return Object.assign(refresh, { counter })
}
