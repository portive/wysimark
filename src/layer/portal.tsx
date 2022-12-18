import { createPortal } from "react-dom"

/**
 * Portal to `document.body`
 *
 * NOTE:
 * Consider creating a version of Portal with a Reset in it.
 *
 * The reason is that when showing a portal, it will carry the baggage of
 * any styling from `<html>` and `<body>` element.
 */
export function Portal({ children }: { children: React.ReactNode }) {
  return createPortal(children, document.body)
}
