import { Editor } from "slate"

import { curry } from "~/src/sink"

function noop(editor: Editor) {
  editor
}

export function create___Methods(editor: Editor) {
  return {
    noop: curry(noop, editor),
  }
}

/**
 * Add this to your types
 */

// type ___Methods = ReturnType<typeof create___Methods>
//
// export type ___Editor = {
//   ___: ___Methods
// }

/**
 * Add this to your plugin definition
 */

// Editor.___ = create___Methods(editor)
