import { useCallback, useState } from "react"

export function useHover() {
  const [isHover, setIsHover] = useState(false)
  const onMouseEnter = useCallback(() => setIsHover(true), [setIsHover])
  const onMouseLeave = useCallback(() => setIsHover(false), [setIsHover])
  return { isHover, onMouseEnter, onMouseLeave }
}
