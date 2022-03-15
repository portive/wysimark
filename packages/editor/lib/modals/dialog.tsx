import cx from "classnames"
import React, { useRef } from "react"
import { Form } from "~/lib/form"
import { useInModal } from "~/lib/modal"
import { useHotkey } from "~/lib/use-hotkey"
import { useInitial } from "~/lib/use-initial"
import { ResetContainer } from "../reset"
import { Position, useContainerReposition } from "./container"
import { Mask } from "./mask"

function Body(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="modal-body" {...props} />
}

function Dialog({
  dest,
  title,
  children,
  position,
  width,
}: {
  dest: HTMLElement
  title?: string
  children: React.ReactNode
  position?: Position
  width?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const modal = useInModal()
  const initial = useInitial()
  useHotkey("escape", () => modal.close(), [modal])
  const pos = useContainerReposition({
    dest,
    ref,
    position,
  })

  const className = cx({ "--initial": initial })
  /**
   * TODO:
   * Fix as const and provide the proper CSS type for a div
   */
  const style = {
    position: "absolute",
    width,
    // minWidth: 320,
    ...pos,
  } as const
  return (
    <ResetContainer>
      <Mask>
        <Form.Dialog ref={ref} style={style} className={className}>
          <Form.Block>
            {title ? <Form.Heading>{title}</Form.Heading> : null}
            <Form.Close onClick={modal.close} />
          </Form.Block>
          {children}
        </Form.Dialog>
      </Mask>
    </ResetContainer>
  )
}

Dialog.Body = Body

export { Dialog }
