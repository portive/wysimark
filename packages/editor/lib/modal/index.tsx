import throttle from "lodash/throttle"
import React, { useContext, useEffect, useState } from "react"
import ReactDOM from "react-dom"
import shallowEqual from "shallowequal"

export enum ModalType {
  Toolbar = 0,
  Dialog = 1, // Pops up over Toolbar
  Tooltip = 2, // There can be tooltips in the Dialog so should be above
  Progress = 3, // Upload progress bar (no tooltips here)
  Error = 4, // Errors need to be above everything!
}

const ModalsContext = React.createContext<{ modals: any; setModals: any }>(
  null as any
)

const InModalContext = React.createContext<{
  Component: React.FunctionComponent
  props: { [key: string]: unknown }
  modal: {
    open: <T>(Component: React.FunctionComponent<T>, props: T) => void
    close: () => void
    zIndex: number
  }
  index: number
} | null>(null)

/**
 * Portal to `document.body`
 *
 * NOTE:
 * Consider creating a version of Portal with the reset in it.
 */
export function Portal({ children }: { children: React.ReactNode }) {
  return ReactDOM.createPortal(children, document.body)
}

/**
 * Renders the modal in a portal with the proper context provided to it
 */

function ModalComponent({ data, index }: any) {
  if (data == null) return null
  const { Component, props, modal } = data
  const zIndex = 100000 + index
  modal.zIndex = zIndex
  const value = { Component, props, modal, index }
  return (
    <Portal>
      <InModalContext.Provider value={value}>
        <Component {...props} />
      </InModalContext.Provider>
    </Portal>
  )
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modals, setModals] = useState([])
  return (
    <ModalsContext.Provider value={{ modals, setModals }}>
      {children}
      {modals.map((data, index) => (
        <ModalComponent key={index} index={index} data={data} />
      ))}
    </ModalsContext.Provider>
  )
}
/**
 * Wraps using a class Component because functional components cannot be
 * assigned a `ref` and sometimes the children (i.e. the modal) is passed in
 * as a functional component.
 */
export class Wrapper extends React.Component<{
  children: React.ReactElement
  [key: string]: any
}> {
  render() {
    const { children, ...props } = this.props
    return React.cloneElement(children, props)
  }
}

/**
 * Use this inside the modal to recalculate the position of the modal
 *
 * It can return values in one of two ways:
 *
 * - As a style object
 * - As an object that contains style objects (for example, tooltip needs to style the arrow and the bubble)
 */

export function useReposition<
  T extends Record<string, unknown>
  // | { [key: string]: string | number | { [key: string]: string | number } }
  // | undefined
>(fn: () => T, dependencies: any[]): T {
  const [style, setStyle] = useState<any>({})
  const reposition = throttle(
    () => {
      try {
        setStyle(fn())
      } catch (e) {
        // console.warn(e)
      }
    },
    100,
    { trailing: true }
  )
  useEffect(() => {
    reposition()
    // setTimeout(reposition)
    window.addEventListener("resize", reposition)
    window.addEventListener("scroll", reposition)
    return () => {
      window.removeEventListener("resize", reposition)
      window.removeEventListener("scroll", reposition)
    }
  }, dependencies)
  return style
}

/**
 * Helper utility that takes a `left` and `top` position (i.e. a style) along
 * with a `getBoundingClientRect` rect and makes sure it is in the viewport.
 */

export function fitInViewport(
  { left, top }: { left: number; top: number },
  srcRect: { width: number }
) {
  // prefer using scrollWidth over innerWidth to account for scrollbar
  const innerWidth = document.body.scrollWidth
  let nextLeft = left,
    nextTop = top
  if (nextLeft + srcRect.width > innerWidth)
    nextLeft = innerWidth - srcRect.width
  if (nextLeft < 0) nextLeft = 0
  // if (nextTop + srcRect.height > innerHeight)
  //   nextTop = innerHeight - srcRect.height - 32 // padding on bottom
  if (nextTop < 0) nextTop = 0

  return {
    left: nextLeft,
    top: nextTop,
  }
}

/**
 * The return type of `useModal`
 */

export type UseModalReturnType = {
  open: <T>(Component: React.FunctionComponent<T>, props: T) => void
  close: () => void
  // modalType: ModalType
  zIndex: number
}

/**
 * Use this to open and close modals.
 *
 * Returns a `modal` object.
 */

export function useModal(modalType: ModalType): UseModalReturnType {
  const modalContext = useContext(ModalsContext)
  /**
   * NOTE:
   *
   * This is defensive. When we use the editor from `wysimark-demo`, calling
   * `useContext` (above) returns `null` on the first render which causes
   * errors.
   *
   * To get around this, we short-circuit and return a similar Object that
   * can't be used to execute; however, since it will remain in this state for
   * such a short period of time, there should be no chance that the user
   * executes the `open` or `close` method.
   */
  if (modalContext == null)
    return {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      open: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      close: () => {},
      zIndex: modalType * 100,
    }
  const { modals, setModals } = modalContext
  function open<T extends { [key: string]: any }>(
    Component: React.FunctionComponent<T>,
    props: T
  ) {
    const modalData = modals[modalType]
    /**
     * Only set the modal if it has changed to prevent re-rendering
     */
    if (
      modalData != null &&
      modalData.Component === Component &&
      shallowEqual(modalData.props, props)
    ) {
      return
    }
    /**
     * Set Modal
     */
    setModals((modals: any[]) => {
      const nextModals = [...modals]
      nextModals[modalType] = { modal, Component, props }
      return nextModals
    })
  }
  function close() {
    setModals((modals: any[]) => {
      const nextModals = [...modals]
      delete nextModals[modalType]
      return nextModals
    })
  }
  const modal = {
    open,
    close,
    // modalType,
    zIndex: modalType * 100,
  }
  return modal
}

/**
 * Use this to get the modal object from inside the modal
 */

export function useInModal() {
  const context = useContext(InModalContext)
  if (context == null) throw new Error("Unexpected context returns null")
  const { modal } = context
  return modal
}
