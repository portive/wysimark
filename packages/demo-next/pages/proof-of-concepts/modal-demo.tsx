import React, { useEffect, useRef } from "react"
import { Form } from "~/lib/form"
import { ModalProvider, ModalType, useModal } from "~/lib/modal"
import { Position } from "~/lib/modals/container"
import { Dialog } from "~/lib/modals/dialog"
import { Reset } from "~/lib/reset"
import { Layout } from "@/components/layout"

/**
 * Proof of Concept for showing Modals open and closing at a location
 */
export default function ModalDemo() {
  return (
    <Layout>
      <Reset>
        <ModalProvider>
          <InnerForm />
        </ModalProvider>
      </Reset>
    </Layout>
  )
}

function InnerForm() {
  const destRef = useRef<HTMLButtonElement>(null)

  const modal = useModal(ModalType.Dialog)

  function open() {
    if (destRef.current != null) {
      modal.open(MarkdownDialog, { dest: destRef.current })
    }
  }

  useEffect(() => {
    open()
    // if (destRef.current != null) {
    //   modal.open(MyDialog, { dest: destRef.current })
    // }
  }, [])

  return (
    <button ref={destRef} onClick={open}>
      Destination
    </button>
  )
}

function MarkdownDialog({ dest }: { dest: HTMLButtonElement }) {
  return (
    <Dialog
      dest={dest}
      title="Import Markdown"
      width={480}
      position={Position.Below}
    >
      <Form.Block>
        <Form.Label>Markdown Code</Form.Label>
        <Form.TextArea
          value={"# Hello World"}
          onChange={() => {
            /* noop */
          }}
          style={{ height: 240 }}
        />
      </Form.Block>
      <Form.Block>
        <Form.Button>
          <i className="fa fa-file-import" /> Import Markdown
        </Form.Button>
      </Form.Block>
    </Dialog>
  )
}
