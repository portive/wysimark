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
  $AnchorDialogInput,
  $AnchorDialogInputLine,
} from "../../styles"
import { $DialogButton, $DialogHint } from "../../styles/dialog-shared-styles"
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
          left: dest.left - 12,
          top: dest.top + dest.height,
        },
        { margin: 16 }
      )
    }
  )

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
          <$DialogButton onClick={insertLink}>
            <Icon.Link />
            <Icon.LinkPlus />
          </$DialogButton>
        </$AnchorDialogInputLine>
        <$DialogHint>Enter URL of link</$DialogHint>
      </$AnchorDialog>
    </>
  )
}
