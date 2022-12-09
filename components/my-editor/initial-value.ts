import { Descendant } from "slate"

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
  {
    type: "table",
    columns: [{ align: "left" }, { align: "center" }, { align: "right" }],
    children: [
      {
        type: "table-row",
        children: [
          {
            type: "table-cell",
            index: 0,
            children: [
              {
                type: "paragraph",
                children: [{ text: "Alpha" }],
              },
            ],
          },
          {
            type: "table-cell",
            index: 1,
            children: [
              {
                type: "paragraph",
                children: [{ text: "Bravo" }],
              },
            ],
          },
          {
            type: "table-cell",
            index: 2,
            children: [
              {
                type: "paragraph",
                children: [{ text: "Charlie" }],
              },
            ],
          },
        ],
      },
      {
        type: "table-row",
        children: [
          {
            type: "table-cell",
            index: 0,
            children: [
              {
                type: "paragraph",
                children: [{ text: "Delta" }],
              },
            ],
          },
          {
            type: "table-cell",
            index: 1,
            children: [
              {
                type: "paragraph",
                children: [{ text: "Echo" }],
              },
            ],
          },
          {
            type: "table-cell",
            index: 2,
            children: [
              {
                type: "paragraph",
                children: [{ text: "Foxtrot" }],
              },
            ],
          },
        ],
      },
    ],
  },
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
        children: [{ text: "  console.log('Hello);" }],
      },
      {
        type: "code-block-line",
        children: [{ text: "}" }],
      },
    ],
  },
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
