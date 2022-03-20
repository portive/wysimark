import { useCallback, useRef, useState } from "react"

/**
 * `useStateRef` is useful when you need both a reactive state that will
 * update the DOM when there is a change while also needing an accurate to
 * the moment version of the value.
 *
 * This can happen when you have a callback and you want to be able to
 * us the `useCallback` hook. If we tie it to a state from `useState`,
 * the data could be outdated when the method is called.
 */
export function useStateRef<T>(fn: () => T) {
  const [rawState, rawSetState] = useState<T>(fn)
  const ref = useRef<T>(rawState)
  const setState = useCallback((fn: (prevState: T) => T) => {
    rawSetState((prevState) => {
      const nextState = fn(prevState)
      ref.current = nextState
      return nextState
    })
  }, [])
  return [rawState, setState, ref] as const
}
