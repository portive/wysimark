import cx from "classnames"
import React, { useRef } from "react"
import { Editor } from "slate"
import { useFocused, useSlate } from "slate-react"
import { colors } from "~/editor/colors"
import { ModalType, useModal } from "~/lib/modal"
import { stopEvent } from "~/lib/stop-event"
import { Tooltip } from "~/lib/tooltip"
import styled from "@emotion/styled"
import { CaretDown } from "../icons"
import {
  Command,
  INSERT_COMMANDS,
  Item,
  MARK_COMMANDS,
  PLUS_COMMANDS,
  SIMPLE_COMMANDS,
  isCommand,
} from "./commands"
import { ToolbarState, getToolbarState } from "./utils/get-toolbar-state"

const $Toolbar = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  user-select: none;
  flex: 0 0 auto;
  border-top-left-radius: ${colors.editorBorderRadius};
  border-top-right-radius: ${colors.editorBorderRadius};
  background: ${colors.toolbarBackgroundColor};
  border-bottom: 1px solid ${colors.editorBorderColor};
  .--initial-editor-content & {
    opacity: 0;
  }
  opacity: 1;
  overflow-y: hidden;
  transition: opacity 1s, height ease 1s, margin-bottom ease 1s;
  .--focused & {
    box-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.05);
    background: #f4f4f4;
  }
`

const $ButtonGroup = styled.div`
  @media (max-width: 767px) {
    &.--desktop-only {
      display: none;
    }
  }
  @media (min-width: 768px) {
    &.--mobile-only {
      display: none;
    }
  }
  display: inline-block;
  height: 40px;
  border-right: 1px solid ${colors.editorBorderColor};
  padding: 0 8px;
`

const $IconButtons = styled.div`
  /* flex item */
  flex: 0 1 auto;
`
const $IconButton = styled.div`
  display: inline-block;
  cursor: pointer;
  width: 32px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: ${colors.toolbarIconColor};
  font-size: 18px;
  svg {
    position: relative;
    top: 2px;
    width: 1em;
    height: 1em;
  }
  transition: color 150ms, background 150ms;
  background: linear-gradient(
    335deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  &.--active {
    background: linear-gradient(
      335deg,
      rgba(0, 0, 0, 0.03) 0%,
      rgba(0, 0, 0, 0.05) 100%
    );
  }

  &:hover {
    color: black;
    background: linear-gradient(
      155deg,
      rgba(22, 15, 15, 0.08) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
  }
`

const $DropdownIcon = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 12px;
  height: 12px;
  font-size: 10px;
`

function DropdownIcon() {
  return (
    <$DropdownIcon>
      <CaretDown />
    </$DropdownIcon>
  )
}

function Button({
  command,
  editor,
  toolbarState,
}: {
  command: Command
  editor: Editor
  toolbarState: ToolbarState
}) {
  const { SvgIcon, label, hotkey, dropdown = false, action, isActive } = command
  const ref = useRef<HTMLDivElement>(null)
  const modal = useModal(ModalType.Dialog)
  const active = isActive ? isActive(toolbarState) : false
  const className = cx({ "--active": active })

  function onMouseDown(e: React.MouseEvent) {
    stopEvent(e) // save the lastSelection so we can use it in dialog.
    // Used in `InsertLinkDialog` for example.
    editor.lastSelection =
      editor.selection != null ? editor.selection : editor.lastSelection
    if (ref.current == null) {
      throw new Error(`ref.current must be defined`)
    }
    const dest = ref.current
    action({ editor, modal, dest, toolbarState })
  }

  return (
    <Tooltip label={label} hotkey={hotkey}>
      <$IconButton
        className={className}
        tabIndex={-1}
        ref={ref}
        unselectable="on"
        onMouseDown={onMouseDown}
        style={{ position: "relative" }}
      >
        {SvgIcon ? <SvgIcon className="wm-svg-icon" /> : null}
        {dropdown ? <DropdownIcon /> : null}
      </$IconButton>
    </Tooltip>
  )
}

function ButtonGroup({
  className,
  items,
  toolbarState,
}: {
  className?: string
  items: Item[]
  toolbarState: ToolbarState
}) {
  const editor = useSlate()
  return (
    <$ButtonGroup className={className}>
      {items.map((item) => {
        if (isCommand(item)) {
          return (
            <Button
              key={item.label}
              command={item}
              editor={editor}
              toolbarState={toolbarState}
            />
          )
        } else {
          return null
        }
      })}
    </$ButtonGroup>
  )
}

const RenderEditorToolbar = React.memo(function RenderEditorToolbar({
  toolbarState,
  focused,
}: {
  toolbarState: ToolbarState
  focused: boolean
}) {
  const className = cx({ "--focused": focused })
  return (
    <$Toolbar tabIndex={-1} className={className}>
      {/* Set `tabIndex` to `-1` above to prevent toolbar from getting focus
      in Firefox. This seems to be a result of `overflow: hidden` causing
      FireFox to give it a tabIndex.

      <https://stackoverflow.com/questions/3670911/how-to-prevent-a-box-with-overflow-y-scroll-from-stealing-the-focus-on-tab-on-f>
      
      */}
      <$IconButtons>
        <ButtonGroup items={SIMPLE_COMMANDS} toolbarState={toolbarState} />
        <ButtonGroup items={MARK_COMMANDS} toolbarState={toolbarState} />
        <ButtonGroup
          items={PLUS_COMMANDS}
          className="--mobile-only"
          toolbarState={toolbarState}
        />
        <ButtonGroup
          items={INSERT_COMMANDS}
          className="--desktop-only"
          toolbarState={toolbarState}
        />
      </$IconButtons>
    </$Toolbar>
  )
})

export function EditorToolbar() {
  const editor = useSlate()
  const focused = useFocused()
  const toolbarState = getToolbarState(editor)
  return <RenderEditorToolbar focused={focused} toolbarState={toolbarState} />
}
