import throttle from "just-throttle"
import { useState } from "react"

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
