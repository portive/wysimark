import { useEffect, useState } from "react"

/**
 * Returns true initially and then on the next tick returns false.
 *
 * Useful when we want the initial value to always be some value but then we
 * quickly switch to another value. This is usually used for CSS transitions.
 */
export function useInitial(showInitial = true) {
  const [initial, setInitial] = useState(showInitial)
  useEffect(() => {
    /**
     * The 50ms delay is important.
     *
     * In our lazy loaded editor, we use `externalModule` from not showing a
     * loader to showing a loader at 1000ms. If the module takes exactly 1000ms
     * to load, there is something funky that happens along that transition
     * where the transition never happens.
     *
     * I theorize that it is because the initial className never makes it to
     * the DOM due to a timing issue.
     *
     * I thought maybe we were just punting the problem to 950ms instead, but
     * testing with 950ms delay (950ms + 50ms = 1000ms) seems to work fine.
     *
     * So unless we can clearly rule out the cause, I suggest we keep this
     * code in.
     */
    const timeoutId = setTimeout(() => {
      setInitial(false)
    }, 50)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [showInitial])
  return initial
}

/**
 * A shortcut version for the most common use case of `useInitial` which is to
 * add an `--initial` className immediately and then remove it.
 *
 * This allows us to do things like add a fade-in.
 *
 * Note: This doesn't support a fade-out but, pragmatically, it seems to matter
 * less and the complexity of a fade-out is higher. This is because we need a
 * way to preserve the React Element after it has been removed.
 */
export function useInitialClassName(
  className = "--initial",
  showInitial = true
) {
  const initial = useInitial(showInitial)
  return initial ? className : ""
}
