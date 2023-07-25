/**
 * NOTE:
 *
 * We have a preference for `just` packages like `just-throttle` since they
 * tend to be micro, but `just-throttle` has a bug. It does not execute
 * on the trailing edge even when told to do so.
 *
 * We ran a test where we logged the call to `refresh` and when the refresh was
 * executed and there were leftover `refresh` calls without a trailing
 * execution.
 */
import throttle from "lodash.throttle"
import { useState } from "react"

export type UseThrottledRefreshReturnType = ReturnType<typeof throttle> & {
  counter: number
}

/**
 * Creates a hook that rerenders a component when the returned `refresh`
 * method is called; however, it throttles the refresh based on the
 * `intervalInMs` argument passed in.
 *
 * This is a useful component used when throttling reposition updates.
 */
export function useThrottledRefresh(
  intervalInMs = 100
): UseThrottledRefreshReturnType {
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
