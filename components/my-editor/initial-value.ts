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
    type: "unordered-list-item",
    depth: 0,
    children: [{ text: "Milk is good for you" }],
  },
  {
    type: "unordered-list-item",
    depth: 0,
    children: [{ text: "Fruits" }],
  },
  {
    type: "ordered-list-item",
    depth: 1,
    number: 1,
    children: [{ text: "Apples" }],
  },
  {
    type: "ordered-list-item",
    depth: 1,
    number: 2,
    children: [{ text: "Oranges" }],
  },
  {
    type: "ordered-list-item",
    depth: 1,
    number: 3,
    children: [{ text: "Bananas" }],
  },
  {
    type: "unordered-list-item",
    depth: 0,
    children: [{ text: "Exercise is good for you" }],
  },
  {
    type: "task-list-item",
    depth: 1,
    checked: false,
    children: [{ text: "Exercise in the morning" }],
  },
  {
    type: "task-list-item",
    depth: 1,
    checked: true,
    children: [{ text: "Biking" }],
  },
  {
    type: "task-list-item",
    depth: 1,
    checked: true,
    children: [{ text: "Hit the Gym" }],
  },
  {
    type: "unordered-list-item",
    depth: 1,
    children: [{ text: "Just a bullet" }],
  },
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
  {
    type: "table",
    columns: [{ align: "left" }, { align: "left" }, { align: "right" }],
    children: [
      {
        type: "table-row",
        children: [
          {
            type: "table-cell",
            children: [
              {
                type: "table-content",
                children: [{ text: "Title" }],
              },
            ],
          },
          {
            type: "table-cell",
            children: [
              {
                type: "table-content",
                children: [{ text: "Director" }],
              },
            ],
          },
          {
            type: "table-cell",
            children: [
              {
                type: "table-content",
                children: [{ text: "Release Date" }],
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
                children: [{ text: "Blade Runner" }],
              },
            ],
          },
          {
            type: "table-cell",
            children: [
              {
                type: "table-content",
                children: [{ text: "Ridley Scott" }],
              },
            ],
          },
          {
            type: "table-cell",
            children: [
              {
                type: "table-content",
                children: [{ text: "1982" }],
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
                children: [{ text: "The Hunt for Red October" }],
              },
            ],
          },
          {
            type: "table-cell",
            children: [
              {
                type: "table-content",
                children: [{ text: "John McTiernan" }],
              },
            ],
          },
          {
            type: "table-cell",
            children: [
              {
                type: "table-content",
                children: [{ text: "1990" }],
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
                children: [{ text: "Sicario" }],
              },
            ],
          },
          {
            type: "table-cell",
            children: [
              {
                type: "table-content",
                children: [{ text: "Denis Villeneuve" }],
              },
            ],
          },
          {
            type: "table-cell",
            children: [
              {
                type: "table-content",
                children: [{ text: "2015" }],
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
        children: [{ text: "  console.log('Hello');" }],
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
