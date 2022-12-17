import { Slate } from "slate-react"

/**
 * We aren't using this yet but better to have it in case we need to add
 * a React Context or something later on.
 */
export function SinkSlate(props: Parameters<typeof Slate>[0]) {
  return <Slate {...props} />
}
