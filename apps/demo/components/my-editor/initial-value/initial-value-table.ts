import { Descendant } from "slate"

export const initialValueTable: Descendant[] = [
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
]
