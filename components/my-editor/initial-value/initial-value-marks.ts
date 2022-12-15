import { Descendant } from "slate"

export const initialValueMarks: Descendant[] = [
  {
    type: "paragraph",
    children: [
      { text: "Normal " },
      { text: "Bold ", bold: true },
      { text: "Italic ", italic: true },
      { text: "Underline ", underline: true },
      { text: "Superscript ", sup: true },
      { text: "Subscript ", sub: true },
    ],
  },
  {
    type: "paragraph",
    children: [
      { text: "Try out some " },
      { text: "Inline Code", code: true },
      { text: " to see how it works. Allow " },
      { text: "bold", bold: true, code: true },
      { text: " in code", code: true },
      { text: "." },
    ],
  },
]
