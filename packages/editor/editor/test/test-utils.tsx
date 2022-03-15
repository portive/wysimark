/** @jsx jsx  */
import isEqual from "lodash/isEqual"
import { Editor, Element, Text } from "slate"
import { createHyperscript } from "slate-hyperscript"
import {
  CodeBlockElement,
  CodeLineElement,
  isInlineElement,
  isVoidElement,
} from "~/editor/types"
import {
  BlockquoteElement,
  HeadingElement,
  HrElement,
  LinkElement,
  MediaElement,
  OrderedListItemElement,
  ParagraphElement,
  TableElement,
  TaskListItemElement,
  TdElement,
  TrElement,
  UnorderedListItemElement,
} from "~/editor/types"
import { withEditor } from "../use-editor"
// import { jsx } from "jsx"

export { withEditor }

// This allows tests to include Slate Nodes written in JSX without TypeScript complaining.
// declare namespace jsx.JSX {
//   interface IntrinsicElements {
//     editor: {}
//     [elemName: string]: any // eslint-disable-line
//   }
// }

// // This allows tests to include Slate Nodes written in JSX without TypeScript complaining.
// declare namespace jsx.JSX {
//   interface IntrinsicElements {
//     // editor: {}
//     // p: {}
//     // heading: { level: 1 | 2 | 3 | 4 | 5 | 6 }
//     // text: {}
//     // cursor: {}
//     // hr: {}
//     [elemName: string]: any // eslint-disable-line
//   }
// }

function logInputOuput(input: Editor, output: Editor) {
  console.log("=== INPUT CHILDREN ===")
  console.log(JSON.stringify(input.children, null, 2))
  console.log("=== OUTPUT CHILDREN ===")
  console.log(JSON.stringify(output.children, null, 2))
  console.log("=== INPUT SELECTION ===")
  console.log(JSON.stringify(input.selection, null, 2))
  console.log("=== OUTPUT SELECTION ===")
  console.log(JSON.stringify(output.selection, null, 2))
}

export function shouldEqual(input: Editor, output: Editor) {
  if (!isEqual(input.children, output.children)) {
    console.error("The editor children are not equal")
    logInputOuput(input, output)
    console.log(JSON.stringify(output.selection, null, 2))
    expect(input.children).toEqual(output.children)
  }
  if (!isEqual(input.selection, output.selection)) {
    console.error("The editor selections are not equal")
    logInputOuput(input, output)
    expect(input.selection).toEqual(output.selection)
  }
}

/**
 * Takes an input editor and an output editor. Runs the transforms against
 * the input editor as it would in our CustomEditor. Then compares both the
 * `children` and the `selection` to make sure they are the same.
 */
export function compare(
  input: Editor,
  output: Editor,
  fn: (editor: Editor) => void
) {
  const editor = withEditor(input)
  fn(editor)
  shouldEqual(input, output)
}

/**
 * A version of compare that takes out extraneous features like normalizing out
 * that we can see what the Slate does naturally.
 */
export function compareWithoutNormalize(
  input: Editor,
  output: Editor,
  run: (editor: Editor) => void
) {
  input.isVoid = isVoidElement
  input.isInline = isInlineElement
  Editor.withoutNormalizing(input, () => {
    run(input)
    shouldEqual(input, output)
  })
}

export function normalize(input: Editor, output: Editor) {
  const editor = withEditor(input)
  Editor.normalize(editor, { force: true })
  shouldEqual(input, output)
}

export function log(...args: any[]) {
  for (const arg of args) {
    console.log(JSON.stringify(arg, null, 2))
  }
}

type JSXFromElement<T extends Element> = Omit<T, "type" | "children">

export const jsx = createHyperscript({
  elements: {
    blockquote: { type: "blockquote" },
    heading: { type: "heading" },
    hr: { type: "hr" },
    link: { type: "link" },
    media: { type: "media" },
    p: { type: "p" },
    /* list elements */
    "unordered-list-item": { type: "unordered-list-item" },
    "ordered-list-item": { type: "ordered-list-item" },
    "task-list-item": { type: "task-list-item" },
    /* table elements */
    table: { type: "table" },
    tr: { type: "tr" },
    td: { type: "td" },
    /* code block elements */
    "code-block": { type: "code-block" },
    "code-line": { type: "code-line" },
  },
})

declare global {
  /**
   * We allow global namespace in eslint as it's required for this custom JSX
   * to work for our unit tests
   */
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jsx.JSX {
    interface IntrinsicElements {
      /**
       * Editor
       */
      editor: Record<string, never>
      /**
       * Text
       */
      text: Omit<Text, "text">
      /**
       * Element
       */
      blockquote: JSXFromElement<BlockquoteElement>
      heading: JSXFromElement<HeadingElement>
      hr: JSXFromElement<HrElement>
      media: JSXFromElement<MediaElement>
      p: JSXFromElement<ParagraphElement>
      link: JSXFromElement<LinkElement>
      /* list elements */
      "unordered-list-item": JSXFromElement<UnorderedListItemElement>
      "ordered-list-item": JSXFromElement<OrderedListItemElement>
      "task-list-item": JSXFromElement<TaskListItemElement>
      /* table elements */
      table: JSXFromElement<TableElement>
      tr: JSXFromElement<TrElement>
      td: JSXFromElement<TdElement>
      /* code block elements */
      "code-block": JSXFromElement<CodeBlockElement>
      "code-line": JSXFromElement<CodeLineElement>
      /**
       * Selection
       */
      cursor: Record<string, never>
      anchor: Record<string, never>
      focus: Record<string, never>
    }
  }
}
