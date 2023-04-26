import styled from "@emotion/styled"

import { useRect } from "./tooltip"

const $Triangle = styled("span")`
  position: fixed;
  z-index: 10;
  width: 0;
  height: 0;
  border-left: 0.375em solid transparent;
  border-right: 0.375em solid transparent;
  border-top: 0.375em solid var(--shade-700);
`

export function Triangle({ dest }: { dest: HTMLElement }) {
  const rect = useRect(dest)
  return (
    <$Triangle
      style={{
        left: `calc(${rect.left + rect.width / 2}px - 0.375em)`,
        top: `calc(${rect.top}px - 0.5em)`,
      }}
    />
  )
}
