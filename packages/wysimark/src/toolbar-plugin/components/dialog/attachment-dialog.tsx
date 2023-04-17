import { styled } from "goober"
import { forwardRef, useRef } from "react"
import { useSlateStatic } from "slate-react"

import { stopEvent } from "../../../sink"
import { positionInside, useAbsoluteReposition } from "../../../use-reposition"
import { $FileDialog } from "../../styles/file-dialog-styles"
import { CloseMask } from "../shared/close-mask"

export function AttachmentDialog({
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

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files == null || e.target.files.length === 0) return
    stopEvent(e)
    const { files } = e.target
    for (const file of files) {
      editor.upload.upload(file)
    }
    close()
  }

  return (
    <>
      <CloseMask close={close} />
      <$FileDialog ref={ref} style={style}>
        <label>
          <input
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={onChange}
          />
          <$DivButton>Select files...</$DivButton>
        </label>
        <$DialogHint>Select files to insert as attachments</$DialogHint>
      </$FileDialog>
    </>
  )
}

export const $DialogHint = styled("div", forwardRef)`
  font-size: 0.875em;
  margin-top: 0.5em;
  color: var(--shade-500);
`

const Focus = `
  border-color: #80bdff;
  border: 1px solid rgb(128, 189, 255);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  outline: none;
`

const $DivButton = styled("div", forwardRef)`
  /* display: inline-block not necessary for a button element but we also
   * style a div which needs this.
   */
  display: inline-block;

  background-color: #1b7eea;
  background-image: linear-gradient(180deg, #068dff 0%, #007bf8 100%);
  border-radius: 5px;
  border-radius: 5px;
  border: 1px solid #007bf8;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  line-height: 34px;
  padding: 0 24px;
  &:focus {
    ${Focus}
  }
  &:hover {
    filter: brightness(107%);
  }
  &:active {
    ${Focus}
  }
`
