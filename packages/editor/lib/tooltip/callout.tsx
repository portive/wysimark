import { useEffect, useRef } from "react"
import React from "react"
import { formatHotkey } from "~/lib/format-hotkey"
import { fitInViewport, useInModal, useReposition } from "~/lib/modal"
import { ResetContainer } from "~/lib/reset"
import styled from "@emotion/styled"

const TRIANGLE_WIDTH = 9
const TRIANGLE_HEIGHT = 6
const CALLOUT_HEIGHT = 28
const BACKGROUND_COLOR = "#202020"

const $TriangleBase = styled.div`
  position: fixed;
  top: -1000px;
  left: -1000px;
  width: 0;
  height: 0;
  border-left: ${TRIANGLE_WIDTH / 2}px solid transparent; /* width/2 */
  border-right: ${TRIANGLE_WIDTH / 2}px solid transparent; /* width/2 */
`

const $TopTriangle = styled($TriangleBase)`
  border-bottom: ${TRIANGLE_HEIGHT}px solid ${BACKGROUND_COLOR}; /* height */
`

const $BottomTriangle = styled($TriangleBase)`
  border-top: ${TRIANGLE_HEIGHT}px solid ${BACKGROUND_COLOR}; /* height */
`

const $Callout = styled.div`
  position: fixed;
  color: #e0e0e0;
  /* background: ${BACKGROUND_COLOR};
  background-image: */
  background: rgb(0, 0, 0);
  background: linear-gradient(
    335deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(65, 65, 65, 1) 100%
  );

  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  top: -1000px;
  left: -1000px;
  border-radius: 4px;
  padding: 0 0.75em;
  line-height: ${CALLOUT_HEIGHT}px;
  .label {
    font: 500 14px -apple-system, sans-serif;
  }
  .hotkey {
    margin-left: 0.5em;
    font-size: 12px;
  }
`

export function Callout({
  dest,
  hotkey,
  label,
  className,
}: {
  dest: HTMLElement
  hotkey?: string
  label: React.ReactNode
  className?: string
}) {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const modal = useInModal()

  /**
   * Easiest way I could find to make sure the callout is hidden when a user
   * click a button to open another Dialog.
   *
   * Even though technically that should be an `onMouseLeave` event, it
   * is not called.
   */
  useEffect(() => {
    document.body.addEventListener("click", modal.close)
    return () => {
      document.body.removeEventListener("click", modal.close)
    }
  })

  const { position, trianglePos, tooltipPos } = useReposition(() => {
    /* If tooltip doesn't exist yet set the position offscreen */
    if (!tooltipRef.current)
      return {
        trianglePos: { left: -1000, top: 0 },
        tooltipPos: { left: -1000, top: 0 },
      }
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const destRect = dest.getBoundingClientRect()
    const { position, triangleRect, tooltipPos } = getPositions(
      destRect,
      tooltipRect
    )
    const fitTooltipPos = fitInViewport(tooltipPos, tooltipRect)
    return { position, trianglePos: triangleRect, tooltipPos: fitTooltipPos }
  }, [dest])
  return (
    <ResetContainer>
      {position === Position.Above ? (
        <$BottomTriangle
          className={className}
          style={{ zIndex: modal.zIndex, ...trianglePos }}
        />
      ) : (
        <$TopTriangle
          className={className}
          style={{ zIndex: modal.zIndex, ...trianglePos }}
        />
      )}
      <$Callout
        ref={tooltipRef}
        style={{ zIndex: modal.zIndex, ...tooltipPos }}
        className={className}
      >
        <span className="label">{label}</span>
        {hotkey ? <span className="hotkey">{formatHotkey(hotkey)}</span> : null}
      </$Callout>
    </ResetContainer>
  )
}

enum Position {
  Above,
  Below,
}

const TOP_OFFSET = 4
const BOTTOM_OFFSET = 2

function getPositions(destRect: DOMRect, tooltipRect: DOMRect) {
  const triangleLeft = destRect.left + destRect.width / 2 - TRIANGLE_WIDTH / 2
  const tooltipLeft = destRect.left + destRect.width / 2 - tooltipRect.width / 2
  if (destRect.top > CALLOUT_HEIGHT + TRIANGLE_HEIGHT) {
    return {
      position: Position.Above,
      triangleRect: {
        left: triangleLeft,
        top: destRect.top - TRIANGLE_HEIGHT - TOP_OFFSET,
      },
      tooltipPos: {
        left: tooltipLeft,
        top: destRect.top - TRIANGLE_HEIGHT - CALLOUT_HEIGHT - TOP_OFFSET,
      },
    }
  } else {
    return {
      position: Position.Below,
      triangleRect: {
        left: triangleLeft,
        top: destRect.bottom + BOTTOM_OFFSET,
      },
      tooltipPos: {
        left: tooltipLeft,
        top: destRect.bottom + TRIANGLE_HEIGHT + BOTTOM_OFFSET,
      },
    }
  }
}
