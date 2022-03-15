import { css } from "@emotion/core"
import styled from "@emotion/styled"

export const unselectable = css`
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
`

export const MAX_MOBILE_WIDTH = 767
export const MIN_TABLET_WIDTH = 768
export const MAX_TABLET_WIDTH = 991
export const MIN_LANDSCAPE_WIDTH = 992
export const MAX_LANDSCAPE_WIDTH = 1199
export const MIN_DESKTOP_WIDTH = 1200

// @media (max-width: 991px) {}

export function scrollbar({
  color,
  borderColor,
  backgroundColor,
}: {
  color: string
  borderColor: string
  backgroundColor: string
}) {
  return css`
    overflow-y: auto;
    &::-webkit-scrollbar-track {
      background-color: ${backgroundColor};
    }

    &::-webkit-scrollbar {
      width: 8px;
      background-color: ${backgroundColor};
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${backgroundColor};
      border: 1px solid rgba(255, 255, 255, 0);
      border-radius: 8px;
    }

    &:hover {
      &::-webkit-scrollbar-track {
        /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
        background-color: ${backgroundColor};
      }

      &::-webkit-scrollbar-thumb {
        background-color: ${color};
        border: 1px solid ${borderColor};
      }
    }
  `
}

export function horizontalScrollbar({
  thumbColor,
  borderColor,
  backgroundColor,
  height,
}: {
  thumbColor: string
  borderColor: string
  backgroundColor: string
  height: number
}) {
  return css`
    overflow-x: auto;
    &::-webkit-scrollbar-track {
      background-color: ${backgroundColor};
      border-radius: ${height / 2}px;
    }

    &::-webkit-scrollbar {
      height: ${height}px;
      background-color: ${backgroundColor};
      border-radius: ${height / 2}px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${thumbColor};
      border: 1px solid ${borderColor};
      border-radius: ${height / 2}px;
    }
  `
}

export const Mask = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.75);
`

export const LightMask = styled(Mask)`
  background: rgba(127, 127, 127, 0.25);
`

export const sidebarShadow = css`
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
`

export const defaultFontFamily = `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`

export const narrowFontFamily = `'sf compact display', -apple-sytem, 'Roboto', 'HelveticaNeue', 'Helvetica Neue', Helvetica, Arial, sans-serif`

export const narrowHeadingCss = css`
  font-size: 0.75em;
  font-weight: 600;
  letter-spacing: 1px;
`

export const $LayoutMask = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`
