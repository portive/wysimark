import { createPortal } from "react-dom"

/**
 * Portal to `document.body`
 *
 * NOTE:
 * Consider creating a version of Portal with the reset in it.
 */
export function Portal({ children }: { children: React.ReactNode }) {
  return createPortal(children, document.body)
}
