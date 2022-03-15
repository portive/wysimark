import cx from "classnames"
import React, { useRef } from "react"
import { CheckIcon, IconComponent } from "~/editor/icons"
import { formatHotkey } from "~/lib/format-hotkey"
import { useInModal } from "~/lib/modal"
import { ResetContainer } from "~/lib/reset"
import { useHotkey } from "~/lib/use-hotkey"
import { useInitial } from "~/lib/use-initial"
import styled from "@emotion/styled"
import { Container, Position, useContainerReposition } from "./container"
import { Mask } from "./mask"

/**
 * Styled Components
 */

export const $Menu = styled(Container)`
  display: block;
  margin-top: 0;
  color: rgba(0, 0, 0, 0.75);
  padding: 4px 0;
  text-align: left;
  list-style: none;
  max-width: 640px;
  @media (max-width: 767px) {
    font-size: 20px;
    font-weight: 400;
    border-radius: 0.5rem;
  }
  @media (min-width: 768px) {
    font-size: 1rem;
    border-radius: 4px;
  }
`

export const $Item = styled.div`
  cursor: pointer;
  font: 400 18px/25px -apple-system, sans-serif;
  display: flex;
  padding: 0 1em 0 0.25em;
  color: #404040;
  svg {
    display: block;
    flex: 0 0 auto;
    margin-top: 3px;
    width: 18px;
    height: 18px;
    margin-right: 12px;
    &.--check {
      color: rgba(0, 0, 0, 0);
      width: 16px;
      margin-right: 4px;
    }
  }
  div.text {
    flex: 1 1 auto;
    padding-right: 2em;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  div.shortcut {
    font-size: 12px;
    line-height: 25px;
  }
  &.--selected {
    background: #f0f0f0;
  }
  &.--active {
    svg.--check {
      color: #00a000;
    }
  }
  &:active {
    color: black; /* Bootstrap flickers to white. This overrides it. */
  }
  &:hover {
    color: black;
    background-color: rgba(0, 0, 0, 0.05);
  }
`

/**
 * Menu Item
 */

export function Item({
  SvgIcon,
  iconProps,
  active = false,
  hotkey,
  children,
  onClick,
  onMouseDown,
  danger,
  muted,
}: {
  SvgIcon?: IconComponent
  iconProps?: React.SVGProps<SVGSVGElement>
  active?: boolean
  hotkey?: string
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<Element>) => void
  onMouseDown?: React.MouseEventHandler
  danger?: boolean
  muted?: boolean
}) {
  const modal = useInModal()
  useHotkey("escape", () => modal.close(), [modal])

  const className = cx("dropdown-item", { "--active": active })

  const textClassName = cx("text", {
    "text-danger": danger,
    "text-muted": muted,
  })

  function clickItem(e: React.MouseEvent<Element>) {
    modal.close()
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <$Item className={className} onClick={clickItem} onMouseDown={onMouseDown}>
      <CheckIcon className="--check" />
      {SvgIcon ? <SvgIcon {...iconProps} /> : null}
      <div className={textClassName}>{children}</div>
      {hotkey ? <div className="shortcut">{formatHotkey(hotkey)}</div> : null}
    </$Item>
  )
}

/**
 * Menu Heading
 */

const $Heading = styled.div`
  cursor: default;
  font-family: sans-serif;
  font-size: 13px;
  padding: 8px 16px 4px 16px;
  color: #808080;
`

/**
 * Menu Divider
 */

const $Divider = styled.div`
  margin: 0.15em 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.075);
`

/**
 * Menu Container
 */

function Menu({
  children,
  dest,
  position = Position.Below,
}: {
  children: any
  dest: HTMLElement
  position?: Position
}) {
  const ref = useRef<any>()
  const style = useContainerReposition({ dest, ref, position })
  const initial = useInitial()
  const className = cx({ "--initial": initial, "--not-initial": !initial })
  return (
    <ResetContainer>
      <Mask>
        <$Menu ref={ref} style={style} className={className}>
          {children}
        </$Menu>
      </Mask>
    </ResetContainer>
  )
}

Menu.Item = Item
Menu.Heading = $Heading
Menu.Divider = $Divider

export { Menu }
