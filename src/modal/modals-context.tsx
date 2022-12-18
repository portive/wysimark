import { createContext, FunctionComponent, useContext, useState } from "react"
import { UnknownRecord } from "type-fest/source/internal"

import { Portal } from "./portal"
import { Modal, ModalsContextValue, ModalsRecord } from "./types"

/**
 * Wrap this around the Component in which you want to have the ability to
 * display one or more modals at once.
 */
export const ModalsContext = createContext<ModalsContextValue>(
  /**
   * This is set to an invalid value and then typecast as the correct type.
   *
   * This is okay though because in `ModalsProvider` we set the value to the
   * proper type before they are used for the first time.
   */
  {} as ModalsContextValue
)

export function ModalsProvider({ children }: { children: React.ReactNode }) {
  const [modals, setModals] = useState<ModalsRecord>({})
  return (
    <ModalsContext.Provider value={{ modals, setModals }}>
      {children}
      {Object.entries(modals).map(([, modal]) => {
        console.log("modals", modals)
        return (
          <Portal key={modal.type}>
            <modal.Component {...modal.props} />
          </Portal>
        )
      })}
    </ModalsContext.Provider>
  )
}

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
