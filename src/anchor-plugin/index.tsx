import { clsx } from "clsx"
import { Descendant } from "slate"
import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps, createPlugin } from "~/src/sink"

import { createAnchorMethods } from "./methods"
import { $Anchor, $Edge } from "./styles"

type AnchorMethods = ReturnType<typeof createAnchorMethods>

export type AnchorEditor = {
  anchor: AnchorMethods
}

export type AnchorElement = {
  type: "anchor"
  href: string
  target?: string
  children: Descendant[]
}

export type AnchorPluginCustomTypes = {
  Name: "anchor"
  Editor: AnchorEditor
  Element: AnchorElement
}

export const AnchorPlugin = () =>
  createPlugin<AnchorPluginCustomTypes>((editor) => {
    editor.anchor = createAnchorMethods(editor)
    return {
      name: "anchor",
      editor: {
        isInline(element) {
          if (element.type === "anchor") return true
        },
      },
      editableProps: {
        renderElement: ({ element, attributes, children }) => {
          if (element.type === "anchor") {
            return (
              <Anchor element={element} attributes={attributes}>
                {children}
              </Anchor>
            )
          }
        },
      },
    }
  })

function Anchor({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<AnchorElement>) {
  const selected = useSelected()
  return (
    <$Anchor
      className={clsx({ "--selected": selected })}
      {...attributes}
      href={element.href}
      target={element.target}
    >
      {/* Edge allow Chrome to differentiate in/out of the link */}
      <$Edge contentEditable={false} />
      <span>{children}</span>
      {/* Edge allow Chrome to differentiate in/out of the link */}
      <$Edge contentEditable={false} />
    </$Anchor>
  )
}
