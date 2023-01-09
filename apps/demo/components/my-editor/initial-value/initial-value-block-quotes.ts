import { Descendant } from "slate"

export const initialValueBlockQuotes: Descendant[] = [
  {
    type: "block-quote",
    children: [
      {
        type: "paragraph",
        children: [{ text: "Paragraph inside a block quote" }],
      },
      {
        type: "block-quote",
        children: [
          {
            type: "paragraph",
            children: [{ text: "Nested block quote inside a block quote" }],
          },
        ],
      },
    ],
  },
]
