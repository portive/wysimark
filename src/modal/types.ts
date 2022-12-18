import { Dispatch, FunctionComponent, SetStateAction } from "react"

export type Modal<T extends Record<string, unknown> = Record<string, unknown>> =
  {
    /**
     * The `type` identifies the use case for the modal and is special in that
     * only one modal can be open for each type.
     *
     * For example, let's say a user opens a tooltip then opens another tooltip.
     * The first opened tooltip will automatically be closed. This reflects how
     * user interface usually work in that only one of each type of Modal can
     * be opened at a time but modals at different levels can be open at the same
     * time like a pop up form and a tooltip for a component in the popup form.
     *
     * Examples of different types are:
     *
     * - toolbar
     * - dialog box
     * - error box
     */
    type: string
    Component: FunctionComponent<T>
    props: T
  }

export type ModalsRecord = Record<string, Modal>

export type ModalsContextValue = {
  modals: ModalsRecord
  setModals: Dispatch<SetStateAction<ModalsRecord>>
}
