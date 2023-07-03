import styled from "@emotion/styled"
import { useCallback } from "react"
import { useSlateStatic } from "slate-react"

import { $Panel } from "../../shared-overlays"
import { useLayer } from "../../use-layer"
import { useAbsoluteReposition } from "../../use-reposition"
import { useTooltip } from "../../use-tooltip"
import { AnchorElement } from "../index"
import { AnchorEditDialog } from "./AnchorEditDialog"
import { ExternalLinkIcon, LinkOffIcon, PencilIcon } from "./icons"

const $AnchorDialog = styled($Panel)`
  position: absolute;
  display: flex;
  width: 20em;
  z-index: 10;
  padding: 1em;
  color: var(--shade-400);

  a.--link {
    display: flex;
    flex: 1 1 auto;
    color: var(--shade-400);
    &:hover {
      color: var(--blue-600);
    }
    transition: all 200ms;
  }
  .--icons {
    display: flex;
    flex: 0 0 auto;
  }

  .--url {
    margin-left: 0.5em;
    .--hostname {
      font-size: 0.875em;
      color: var(--blue-600);
    }
    .--pathname {
      font-size: 0.75em;
      overflow: ellipsis;
    }
  }

  .--icon {
    cursor: pointer;
    margin-left: 0.5em;
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
  const dialog = useLayer("dialog")
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

  const openEditDialog = useCallback(() => {
    dialog.open(() => (
      <AnchorEditDialog
        destAnchor={destAnchor}
        destStartEdge={destStartEdge}
        element={element}
      />
    ))
  }, [destAnchor, destStartEdge, element])

  return (
    <$AnchorDialog contentEditable={false} style={style}>
      <a
        className="--link"
        href={element.href}
        target="_blank"
        rel="noreferrer"
      >
        <ExternalLinkIcon />
        <div className="--url">
          <div className="--hostname">{url.hostname}</div>
          <div className="--pathname">{url.pathname}</div>
        </div>
      </a>
      <span className="--icons">
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
          onClick={openEditDialog}
        >
          <PencilIcon />
        </span>
      </span>
    </$AnchorDialog>
  )
}
