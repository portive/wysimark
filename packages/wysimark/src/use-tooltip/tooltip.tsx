import styled from "@emotion/styled"

export function useRect(dest: HTMLElement): DOMRect {
  return dest.getBoundingClientRect()
}

const $Tooltip = styled("div")`
  position: fixed;
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

const $Hotkey = styled("span")`
  margin-left: 0.75em;
  font-size: 0.875em;
  font-weight: 500;
  color: var(--shade-400);
`

export function Tooltip({
  title,
  hotkey,
  dest,
}: {
  title: string
  hotkey?: string
  dest: HTMLElement
}) {
  const rect = useRect(dest)
  return (
    <$Tooltip
      style={{
        left: rect.left,
        top: `calc(${rect.top}px - 2em)`,
      }}
    >
      {title}

      {hotkey ? <$Hotkey>{hotkey}</$Hotkey> : null}
    </$Tooltip>
  )
}
