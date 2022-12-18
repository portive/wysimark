import { styled } from "goober"
import { forwardRef } from "react"

function useRect(dest: HTMLElement): DOMRect {
  return dest.getBoundingClientRect()
}

const $Tooltip = styled("div", forwardRef)`
  position: absolute;
  z-index: 10;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  color: white;
  font-size: 0.875em;
  line-height: 1.5em;
  padding: 0 0.5em;
  color: var(--shade-300);
  background: var(--shade-700);
  border-radius: 0.25em;
  white-space: nowrap;
`

export function Tooltip({ title, dest }: { title: string; dest: HTMLElement }) {
  const rect = useRect(dest)
  return (
    <$Tooltip
      style={{
        left: rect.left,
        top: `calc(${rect.top}px - 2em)`,
      }}
    >
      {title}
    </$Tooltip>
  )
}
