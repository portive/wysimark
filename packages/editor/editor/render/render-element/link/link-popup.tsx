import React, { RefObject, useCallback, useState } from "react"
import { Transforms } from "slate"
import { ReactEditor, useSlateStatic } from "slate-react"
import { getLinkInfo } from "~/editor/custom"
import { LinkIcon } from "~/editor/icons"
import {
  CheckIcon,
  ClipboardTextIcon,
  LinkBreakIcon,
  PencilIcon,
} from "~/editor/icons/link-icons"
import { InsertLinkDialog } from "~/editor/toolbar/dialog/insert-link-dialog"
import { LinkElement } from "~/editor/types"
import { ModalType, Portal, fitInViewport, useModal } from "~/lib/modal"
import { CONTAINER_STYLE } from "~/lib/modals/container"
import { Reset } from "~/lib/reset"
import { stopEvent } from "~/lib/stop-event"
import { Tooltip } from "~/lib/tooltip"
import { useInitialClassName } from "~/lib/use-initial"
import { unselectable } from "~/parts/css"
import styled from "@emotion/styled"

const $LinkDialog = styled.div`
  position: absolute;
  /* Container style with background, border, radius, drop shadow */
  ${CONTAINER_STYLE}
  padding: 0.75em 0.75em 0.75em 2em;
  z-index: 1;
  width: 320px;
  color: #c0c0c0;
  ${unselectable}
  div.--globe-icon {
    position: absolute;
    color: #a0a0a0;
    font-size: 1em;
    left: 12px;
    top: 16px;
  }
  a {
    ${unselectable}
    color: #0366d6;
    font-size: 14px;
    line-height: 28px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  line-height: 24px;
  div.--icons {
    font-size: 17px;
    position: absolute;
    top: 14px;
    right: 0.5em;
  }
  span.--icon {
    ${unselectable}
    display: inline-block;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.05);
    margin-left: 2px;
    color: #808080;
    text-align: center;
    cursor: pointer;
    padding-top: 5px;
    &:hover {
      color: #404040;
      background: #e0e0e0;
    }
  }
  /**
   * Fade in using 'useInitialClassName'
   */
  &.--initial {
    opacity: 0;
  }
  opacity: 1;
  transition: opacity linear 200ms;
`

export function LinkPopup({
  element,
  linkRef,
  copy,
}: {
  element: LinkElement
  linkRef: RefObject<HTMLAnchorElement>
  copy: (text: string) => void
}) {
  const modal = useModal(ModalType.Dialog)
  const editor = useSlateStatic()
  const [copied, setCopied] = useState(false)
  const className = useInitialClassName()

  /**
   * Copy the link URL to clipboard
   */
  const clickCopy = useCallback(() => {
    copy(element.url)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }, [element])

  /**
   * Open the edit link dialog
   */
  const clickEdit = useCallback(() => {
    if (linkRef.current == null) return
    modal.open(InsertLinkDialog, { dest: linkRef.current, editor })
  }, [element])

  /**
   * Unlink the current link
   */
  const clickRemove = useCallback(() => {
    const linkInfo = getLinkInfo(editor)
    if (linkInfo.path != null) {
      Transforms.unwrapNodes(editor, { at: linkInfo.path })
      ReactEditor.focus(editor)
    }
  }, [element])

  if (linkRef.current == null) return null

  const rect = linkRef.current.getBoundingClientRect()
  /**
   * Set the `width` to 324px to give us a 4px margin over 320px on the right
   */
  const style = {
    ...fitInViewport(
      { left: rect.left, top: rect.bottom + 4 + window.scrollY },
      { width: 324 }
    ),
    // Same z-index as Dialog.TOOLBAR
    zIndex: 10000,
  }

  return (
    <Portal>
      <Reset>
        <$LinkDialog style={style} className={className}>
          <div className="--globe-icon">
            <LinkIcon />
            {/* <GlobeIcon /> */}
          </div>
          {/**
           * We must use `preventDefault` and `stopPropagation` on `onMouseDown`
           * or the link doesn't work.
           */}
          <Tooltip label="Open URL in new tab">
            <a
              href={element.url}
              target="_blank"
              rel="noreferrer"
              onMouseDown={stopEvent}
            >
              {element.url}
            </a>
          </Tooltip>
          <div className="--icons">
            <Tooltip label="Copy URL to clipboard">
              <span className="--icon" onMouseDown={clickCopy}>
                {copied == false ? <ClipboardTextIcon /> : <CheckIcon />}
              </span>
            </Tooltip>
            <Tooltip label="Edit link">
              <span className="--icon" onMouseDown={clickEdit}>
                <PencilIcon />
              </span>
            </Tooltip>
            <Tooltip label="Unlink">
              <span className="--icon" onMouseDown={clickRemove}>
                <LinkBreakIcon />
              </span>
            </Tooltip>
          </div>
        </$LinkDialog>
      </Reset>
    </Portal>
  )
}
