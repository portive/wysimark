import React, { useRef } from "react"

import { CONTAINER_STYLE } from "./container"
import { Field } from "~/components/field"
import { Mask } from "./mask"
import styled from "@emotion/styled"
import { useInModal } from "~/lib/modal"

const $Header = styled.div`
  &:active {
    box-shadow: none;
  }
`
const $ErrorDialog = styled.div`
  ${CONTAINER_STYLE}
  position: absolute;
  width: auto;

  button {
    &:focus {
      /* Disable the outline ring from bootstrap on close button */
      outline: none;
    }
  }

  @media (max-width: 767px) {
    left: 1em;
    top: 1em;
    right: 1em;
    margin-bottom: 2em;
  }
  @media (min-width: 768px) {
    left: 2em;
    top: 2em;
    right: 2em;
    /**
     * Give us some extra space at the bottom for the gutter. We can't easily
     * set is in JavaScript because we are using absolute positioning.
     */
    margin-bottom: 2em;
  }
`

const $Stack = styled.div`
  white-space: pre;
  overflow-x: scroll;
  border: 1px solid rgba(0, 0, 0, 0.1);
`

function ErrorDialog({ title, error }: { title: string; error: Error }) {
  const ref = useRef<HTMLDivElement>(null)
  const modal = useInModal()
  return (
    <Mask>
      <$ErrorDialog ref={ref} className="modal-content">
        <$Header className="modal-header">
          {title ? <h5 className="modal-title text-danger">{title}</h5> : null}
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            onClick={modal.close}
          >
            <span>&times;</span>
          </button>
        </$Header>
        <Field.Group>
          <$Stack className="modal-body">{error.stack}</$Stack>
        </Field.Group>
        <Field.Buttons>
          <Field.Button primary onClick={modal.close}>
            Got it
          </Field.Button>
        </Field.Buttons>
      </$ErrorDialog>
    </Mask>
  )
}

export { ErrorDialog }
