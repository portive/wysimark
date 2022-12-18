import { FunctionComponent, useContext } from "react"
import { UnknownRecord } from "type-fest/source/internal"

import { ModalsContext } from "./modals-context"
import { Modal } from "./types"

export function useModal<T extends Record<string, unknown>>(
  type: string,
  Component: FunctionComponent<T>
) {
  const { modals, setModals } = useContext(ModalsContext)

  function open(props: T) {
    const modal = { type, Component, props } as Modal<UnknownRecord>
    setModals({
      ...modals,
      tooltip: modal,
    })
  }

  function close() {
    const nextModals = { ...modals }
    delete nextModals["tooltip"]
    setModals(nextModals)
  }

  return { open, close, type, Component }
}
