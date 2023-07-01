import styled from "@emotion/styled"
import { useCallback } from "react"
import { useSlateStatic } from "slate-react"

import { $Panel } from "../../shared-overlays"
import { useAbsoluteReposition } from "../../use-reposition"
import { useTooltip } from "../../use-tooltip"
import { AnchorElement } from "../index"
import { ExternalLinkIcon, LinkOffIcon, PencilIcon } from "./icons"

const $AnchorDialog = styled($Panel)`
  position: absolute;
  display: flex;
  bottom: -2em;
  width: 20em;
  height: 4em;
  z-index: 10;
  padding: 0.5em 1em;
  .--url {
    flex: 1 1 auto;
    margin-left: 0.5em;
    color: var(--blue-600);
    &:hover {
      color: var(--blue-700);
    }
    .--hostname {
    }
    .--pathname {
      color: var(--shade-500);
      font-size: 0.75em;
      overflow: ellipsis;
    }
  }
  .--icon {
    flex: 0 0 auto;
    margin-top: 0.25em;
    margin-left: 0.5em;
    cursor: pointer;
    color: var(--shade-400);
    &:hover {
      color: var(--blue-600);
    }
  }
  svg {
    width: 1.25em;
    height: 1.25em;
    stroke-width: 1.5;
  }
`

function parseUrl(s: string): { hostname: string; pathname: string } {
  try {
    const url = new URL(s)
    return { hostname: url.hostname, pathname: url.pathname }
  } catch (e) {
    return { hostname: "", pathname: "" }
  }
}

export function AnchorDialog({
  destAnchor,
  destStartEdge,
  element,
}: {
  destAnchor: HTMLAnchorElement
  destStartEdge: HTMLSpanElement
  element: AnchorElement
}) {
  const editor = useSlateStatic()
  const url = parseUrl(element.href)
  const style = useAbsoluteReposition(
    { destAnchor, destStartEdge },
    ({ destAnchor, destStartEdge }) => {
      return {
        left: destStartEdge.left,
        top: destAnchor.top + destAnchor.height,
      }
    }
  )

  const removeTooltip = useTooltip({ title: "Remove link" })
  const editTooltip = useTooltip({ title: "Edit link" })

  const removeLink = useCallback(() => {
    editor.anchor.removeLink({ at: element })
  }, [editor])

  return (
    <$AnchorDialog contentEditable={false} style={style}>
      <a href={element.href} target="_blank" rel="noreferrer">
        <ExternalLinkIcon />
      </a>
      <a className="--url" href={element.href} target="_blank" rel="noreferrer">
        <div className="--hostname">{url.hostname}</div>
        <div className="--pathname">{url.pathname}</div>
      </a>
      <span
        className="--icon"
        onClick={removeLink}
        onMouseEnter={removeTooltip.onMouseEnter}
        onMouseLeave={removeTooltip.onMouseLeave}
      >
        <LinkOffIcon />
      </span>
      <span
        className="--icon"
        onMouseEnter={editTooltip.onMouseEnter}
        onMouseLeave={editTooltip.onMouseLeave}
      >
        <PencilIcon />
      </span>
    </$AnchorDialog>
  )
}
