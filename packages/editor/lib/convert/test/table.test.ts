import { TableElement } from "~/editor/types"
import { RootBlockElement } from "~/editor/types"
import { roundtrip, testParse } from "./convert-test-utils"
import { td } from "./util"

describe("table", () => {
  it("should parse a table with column alignment", async () => {
    const tableMarkdown = `|a|b|c|
|:-|:-:|-:|
|d|e|f`
    const blocks: RootBlockElement[] = [
      {
        type: "table",
        columns: [{ align: "left" }, { align: "center" }, { align: "right" }],
        children: [
          {
            type: "tr",
            children: [td(0, "a"), td(1, "b"), td(2, "c")],
          },
          {
            type: "tr",
            children: [td(0, "d"), td(1, "e"), td(2, "f")],
          },
        ],
      },
      { type: "p", children: [{ text: "" }] },
    ]
    testParse(tableMarkdown, blocks)
  })

  it("should handle a table", () => {
    const blocks: RootBlockElement[] = [
      {
        type: "table",
        columns: [{ align: "left" }, { align: "center" }, { align: "right" }],
        children: [
          {
            type: "tr",
            children: [td(0, "head-1"), td(1, "head-2"), td(2, "head-3")],
          },
          {
            type: "tr",
            children: [
              td(0, { text: "data", bold: true }),
              td(1, { text: "data", italic: true }),
              td(2, { text: "data", italic: true }),
            ],
          },
        ],
      },
    ]
    const markdown = `|head\\-1|head\\-2|head\\-3|\n|:-|:-:|-:|\n|**data**|_data_|_data_|`
    const text = `| head-1 | head-2 | head-3 |\n| data | data | data |`
    roundtrip(blocks, { markdown, text })
  })

  it("should handle a table with a br", () => {
    const blocks: RootBlockElement[] = [
      {
        type: "table",
        columns: [{ align: "left" }, { align: "center" }],
        children: [
          {
            type: "tr",
            children: [td(0, "head-1\nbr"), td(1, "head-2")],
          },
          {
            type: "tr",
            children: [
              td(0, { text: "data", bold: true }),
              td(1, { text: "data", italic: true }),
            ],
          },
        ],
      },
    ]
    const markdown = `|head\\-1<br>br|head\\-2|\n|:-|:-:|\n|**data**|_data_|`
    const text = `| head-1\nbr | head-2 |\n| data | data |`
    roundtrip(blocks, { markdown, text })
  })

  it("should handle two tables next to each other", () => {
    const table: TableElement = {
      type: "table",
      columns: [{ align: "left" }, { align: "center" }],
      children: [
        {
          type: "tr",
          children: [td(0, "x"), td(1, "x")],
        },
      ],
    }
    const blocks: RootBlockElement[] = [table, table]
    const markdown = "|x|x|\n|:-|:-:|\n\n|x|x|\n|:-|:-:|"
    const text = "| x | x |\n\n| x | x |"
    roundtrip(blocks, { markdown, text })
  })

  it("should handle an empty table", async () => {
    const blocks: RootBlockElement[] = [
      {
        type: "table",
        columns: [{ align: "left" }, { align: "center" }, { align: "right" }],
        children: [
          {
            type: "tr",
            children: [td(0, ""), td(1, ""), td(2, "")],
          },
          {
            type: "tr",
            children: [
              td(0, { text: "", bold: true }),
              td(1, { text: "", italic: true }),
              td(2, { text: "", italic: true }),
            ],
          },
        ],
      },
    ]
    const markdown = "||||\n|:-|:-:|-:|\n||||"
    const text = "|  |  |  |\n|  |  |  |"

    roundtrip(blocks, { markdown, text })
  })

  it("should parse a table without alignment", async () => {
    const markdown = `|alpha|bravo|
|---|---|
|charlie|delta|`

    const blocks: RootBlockElement[] = [
      {
        type: "table",
        columns: [{ align: "left" }, { align: "left" }],
        children: [
          {
            type: "tr",
            children: [td(0, "alpha"), td(1, "bravo")],
          },
          {
            type: "tr",
            children: [td(0, "charlie"), td(1, "delta")],
          },
        ],
      },
      { type: "p", children: [{ text: "" }] },
    ]
    testParse(markdown, blocks)
  })
})
