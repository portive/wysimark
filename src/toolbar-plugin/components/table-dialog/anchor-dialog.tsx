import { isHotkey } from "is-hotkey"
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from "react"
import { ReactEditor, useSlateStatic } from "slate-react"

import { positionInside, useAbsoluteReposition } from "~/src/use-reposition"

import * as Icon from "../../icons"
import {
  $AnchorDialog,
  $AnchorDialogButton,
  $AnchorDialogHint,
  $AnchorDialogInput,
  $AnchorDialogInputLine,
} from "../../styles"
import { CloseMask } from "../shared/close-mask"

const isEnter = isHotkey("enter")

export function AnchorDialog({
  dest,
  close,
}: {
  dest: HTMLElement
  close: () => void
}) {
  const editor = useSlateStatic()
  const ref = useRef<HTMLDivElement>(null)
  const style = useAbsoluteReposition(
    { src: ref, dest },
    ({ src, dest }, viewport) => {
      return positionInside(
        src,
        viewport,
        {
          left: dest.left,
          top: dest.top + dest.height,
        },
        { margin: 16 }
      )
    }
  )

  console.log("AnchorDialog style", style)

  const [url, setUrl] = useState("")

  const insertLink = () => {
    editor.anchor.insertLink(url, url, { select: true })
    ReactEditor.focus(editor)
    close()
  }

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUrl(e.currentTarget.value)
    },
    [setUrl]
  )

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isEnter(e)) return
    e.preventDefault()
    e.stopPropagation()
    insertLink()
  }

  return (
    <>
      <CloseMask close={close} />
      <$AnchorDialog ref={ref} style={style}>
        <$AnchorDialogInputLine>
          <$AnchorDialogInput
            type="text"
            value={url}
            autoFocus
            onChange={onChangeInput}
            onKeyDown={onKeyDown}
          />
          <$AnchorDialogButton onClick={insertLink}>
            <Icon.Link />
            <Icon.LinkPlus />
          </$AnchorDialogButton>
        </$AnchorDialogInputLine>
        <$AnchorDialogHint>Enter URL of link</$AnchorDialogHint>
      </$AnchorDialog>
    </>
  )
}
