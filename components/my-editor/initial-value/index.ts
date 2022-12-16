import { Descendant } from "slate"

import { initialValueBlockQuotes } from "./initial-value-block-quotes"
import { initialValueCodeBlocks } from "./initial-value-code-blocks"
import { initialValueList } from "./initial-value-list"
import { initialValueMarks } from "./initial-value-marks"
import { initialValueTable } from "./initial-value-table"

export const initialValue: Descendant[] = [
  {
    type: "heading",
    level: 1,
    children: [{ text: "Hello World 1" }],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "Hello World 2" }],
  },
  ...initialValueList,
  ...initialValueTable,
  // { type: "paragraph", children: [{ text: "" }] },
  { type: "horizontal-rule", children: [{ text: "" }] },
  // { type: "paragraph", children: [{ text: "" }] },
  ...initialValueCodeBlocks,
  ...initialValueMarks,
  {
    type: "paragraph",
    children: [
      { text: "Hello World " },
      {
        type: "anchor",
        href: "https//www.google.com/",
        children: [{ text: "Link" }],
      },
      { text: " end of line." },
    ],
  },
  ...initialValueBlockQuotes,
]
