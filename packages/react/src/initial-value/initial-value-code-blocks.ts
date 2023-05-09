import { Descendant } from "slate"

export const initialValueCodeBlocks: Descendant[] = [
  {
    type: "code-block",
    language: "javascript",
    children: [
      {
        type: "code-block-line",
        children: [{ text: "function hello() {" }],
      },
      {
        type: "code-block-line",
        children: [{ text: "  console.log('Hello');" }],
      },
      {
        type: "code-block-line",
        children: [{ text: "}" }],
      },
    ],
  },
]
