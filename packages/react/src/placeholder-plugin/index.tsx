import { RenderPlaceholderProps } from "slate-react"

import { createPlugin, TypedPlugin } from "~/src/sink"

export type PlaceholderEditor = {
  placeholder: {}
}

export type PlaceholderPluginCustomTypes = {
  Name: "placeholder"
  Editor: PlaceholderEditor
}

/**
 * To have the placeholder work properly, it cannot have `width: 100%` and
 * `max-width: 100%` set or it creates horizontal scrollbars.
 *
 * The default `renderPlaceholder` adds these styles so we override them.
 */
function renderPlaceholder(props: RenderPlaceholderProps) {
  const nextAttributes: RenderPlaceholderProps["attributes"] = {
    ...props.attributes,
    style: {
      ...props.attributes.style,
      width: undefined,
      maxWidth: undefined,
    },
  }
  return <span {...nextAttributes}>{props.children}</span>
}

export const PlaceholderPlugin = createPlugin<PlaceholderPluginCustomTypes>(
  (editor, options, { createPolicy }) => {
    editor.placeholder = {}
    return createPolicy({
      name: "placeholder",
      editableProps: {
        renderPlaceholder,
      },
    })
  }
) as TypedPlugin<PlaceholderPluginCustomTypes>
