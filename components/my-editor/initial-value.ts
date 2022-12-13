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
  { type: "horizontal-rule", children: [{ text: "" }] },
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
    type: "list",
    style: "unordered",
    children: [
      {
        type: "list-item",
        children: [
          {
            type: "list-content",
            children: [{ text: "Milk is good for you" }],
          },
        ],
      },
      {
        type: "list-item",
        children: [
          {
            type: "list-content",
            children: [{ text: "Fruits" }],
          },
          {
            type: "list",
            style: "ordered",
            children: [
              {
                type: "list-item",
                children: [
                  { type: "list-content", children: [{ text: "Apples" }] },
                ],
              },
              {
                type: "list-item",
                children: [
                  { type: "list-content", children: [{ text: "Oranges" }] },
                ],
              },
              {
                type: "list-item",
                children: [
                  { type: "list-content", children: [{ text: "Bananas" }] },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "list-item",
        children: [
          {
            type: "list-content",
            children: [{ text: "Exercise is good for you" }],
          },
          {
            type: "list",
            style: "unordered",
            children: [
              {
                type: "list-item",
                checked: false,
                children: [
                  {
                    type: "list-content",
                    children: [{ text: "Exercise in the morning" }],
                  },
                ],
              },
              {
                type: "list-item",
                checked: true,
                children: [
                  { type: "list-content", children: [{ text: "Biking" }] },
                ],
              },
              {
                type: "list-item",
                checked: false,
                children: [
                  { type: "list-content", children: [{ text: "Hit the Gym" }] },
                ],
              },
              {
                type: "list-item",
                children: [
                  {
                    type: "list-content",
                    children: [{ text: "Just a bullet" }],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: "paragraph",
    children: [{ text: "" }],
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
            children: [
              {
                type: "table-content",
                children: [{ text: "Alpha" }],
              },
            ],
          },
          {
            type: "table-cell",
            children: [
              {
                type: "table-content",
                children: [{ text: "Bravo" }],
              },
            ],
          },
          {
            type: "table-cell",
            children: [
              {
                type: "table-content",
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
            children: [
              {
                type: "table-content",
                children: [{ text: "Delta" }],
              },
            ],
          },
          {
            type: "table-cell",
            children: [
              {
                type: "table-content",
                children: [{ text: "Echo" }],
              },
            ],
          },
          {
            type: "table-cell",
            children: [
              {
                type: "table-content",
                children: [{ text: "Foxtrot" }],
              },
            ],
          },
        ],
      },
    ],
  },
  { type: "paragraph", children: [{ text: "" }] },
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

      { type: "paragraph", children: [{ text: "" }] },
    ],
  },
]
