import React from "react"
import { initialStyles } from "~/lib/form/animate-utils"
import { fitInViewport, useReposition } from "~/lib/modal"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

export enum Position {
  Below,
  BelowLeft,
  Inside,
}

function positionBelow(
  srcRect: DOMRect,
  destRect: DOMRect
): { left: number; top: number } {
  return { left: destRect.left, top: destRect.bottom }
}

function positionBelowLeft(
  srcRect: DOMRect,
  destRect: DOMRect
): { left: number; top: number } {
  return {
    left: destRect.left + destRect.width - srcRect.width,
    top: destRect.bottom,
  }
}

function positionInside(
  srcRect: DOMRect,
  destRect: DOMRect
): { left: number; top: number } {
  return {
    left: destRect.left + (destRect.width - srcRect.width) / 2,
    top: destRect.top,
  }
}

function getPosition(position: Position, srcRect: DOMRect, destRect: DOMRect) {
  switch (position) {
    case Position.Below:
      return positionBelow(srcRect, destRect)
    case Position.Inside:
      return positionInside(srcRect, destRect)
    case Position.BelowLeft:
      return positionBelowLeft(srcRect, destRect)
  }
  throw new Error(`Unhandled position value ${position}`)
}

/**
 * Reposition under an element, usually the button that opened the container
 */
export function useContainerReposition({
  dest,
  ref,
  position = Position.Below,
}: {
  dest: HTMLElement
  ref: React.RefObject<HTMLElement>
  position?: Position
}): { left: number; top: number } {
  // is.object(ref)
  // useLockBodyScroll()
  return useReposition(() => {
    const { innerWidth } = window
    if (ref.current == null)
      throw new Error(`Ref not assigned but should be I think`)
    const srcRect = ref.current.getBoundingClientRect()
    const destRect = dest.getBoundingClientRect()
    if (innerWidth < 768) {
      /**
       * TODO:
       *
       * There are still two issues:
       *
       * - If there is a scrolled sticky, the position is wrong. May be a bug
       *   in the browser in how it returns the position of a sticky.
       *
       * - If the container ends up below the fold, we get two scrollbars which
       *   feels weird. Probably should have the one scrollbar that scrolls
       *   both. The second scrollbar visually looks wrong and confusing.
       *   A temporary improvement could be to change the design of the second
       *   scrollbar (the inner one). Long term, I think if the item is bigger,
       *   pushing the bottom of the page to grow longer should be okay.
       */
      const pos = { left: 20, top: destRect.bottom }
      return fitInViewport(pos, srcRect)
    } else {
      const rect = getPosition(position, srcRect, destRect)
      // const rect =
      //   position === Position.Below
      //     ? positionBelow(srcRect, destRect)
      //     : positionInside(srcRect, destRect)
      const fitRect = fitInViewport(rect, srcRect)
      return fitRect
    }
  }, [dest])
}

export const CONTAINER_STYLE = css`
  background: white;
  border: 1px solid #00000030;
  border-radius: 5px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
`

export const Container = styled.div`
  ${CONTAINER_STYLE}
  ${initialStyles}
  position: absolute;
  width: auto;
  min-width: 10rem;
  left: 1600px;
  border: 1px solid silver;
  @media (max-width: 767px) {
    width: calc(100% - 2em);
  }
  @media (min-width: 768px) {
  }
  /**
   * Give us some extra space at the bottom for the gutter. We can't easily
   * set is in JavaScript because we are using absolute positioning.
   */
  margin-bottom: 1em;
  /**
   * The minimal amount of CSS to force the iPhone to make space underneath
   * the position absolute. To be clear, all of 'width', 'height' and 'content'
   * are required.
   */
  &::after {
    position: absolute;
    content: " ";
    width: 1px;
    height: 1px;
    bottom: -1em;
  }
`
