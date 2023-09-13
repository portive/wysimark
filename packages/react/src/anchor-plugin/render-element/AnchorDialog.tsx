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

  .--icons {
    display: flex;
    overflow: hidden;
    flex: 0 0 6em;
  }

  .--link {
    text-decoration: none;
    display: flex;
    flex: 0 0 14em;
    overflow: hidden;
    color: var(--shade-400);
    &:hover {
      color: var(--blue-600);
    }
    transition: all 200ms;
  }

  .--url {
    margin-left: 0.5em;
    .--hostname {
      font-size: 0.875em;
      width: 14em;
      line-height: 1.5em;
      color: var(--blue-600);
      overflow-wrap: break-word;
      /* width: 13.5em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis; */
    }
    .--pathname {
      margin-top: 0.125em;
      font-size: 0.75em;
      width: 16.25em;
      line-height: 1.5em;
      overflow-wrap: break-word;
    }
    .--tooltip {
      box-sizing: border-box;
      position: relative;
      margin-top: 1em;
      font-size: 0.875em;
      width: 14em;
      line-height: 1.5em;
      background: var(--shade-200);
      border-radius: 0.5em;
      padding: 0.5em 0.75em;
      color: var(--shade-600);
      overflow-wrap: break-word;
    }
    .--tooltip::before {
      content: "";
      position: absolute;
      top: -0.5em; /* Height of the triangle */
      left: 0.5em; /* Position it on the left side */
      border-left: 0.5em solid transparent; /* Half the width of the triangle */
      border-right: 0.5em solid transparent; /* Half the width of the triangle */
      border-bottom: 0.5em solid var(--shade-200); /* Height and color of the triangle */
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
    flex: 0 0 auto;
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
          {url.pathname === "" || url.pathname === "/" ? null : (
            <div className="--pathname">{url.pathname}</div>
          )}
          {element.title == null || element.title === "" ? null : (
            <div className="--tooltip">{element.title}</div>
          )}
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
