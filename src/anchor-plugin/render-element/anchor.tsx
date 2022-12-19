import { clsx } from "clsx"
import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { AnchorElement } from "../index"
import { $Anchor, $Edge } from "../styles"

export function Anchor({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<AnchorElement>) {
  const selected = useSelected()
  return (
    <$Anchor
      className={clsx({ "--selected": selected })}
      href={element.href}
      target={element.target}
      {...attributes}
    >
      {/* Edge allow Chrome to differentiate in/out of the link */}
      <$Edge contentEditable={false} />
      <span>{children}</span>
      {/* Edge allow Chrome to differentiate in/out of the link */}
      <$Edge contentEditable={false} />
    </$Anchor>
  )
}
