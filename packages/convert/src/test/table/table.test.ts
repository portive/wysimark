import { TableCellElement, TableRowElement } from "wysimark/src/table-plugin"

import { check } from "../test-utils"

/**
 * create a cell with a plain string or explicit `TableCellElement`
 */
function $cell(data: string | TableCellElement): TableCellElement {
  if (typeof data !== "string") return data
  return {
    type: "table-cell",
    children: [
      {
        type: "table-content",
        children: [{ text: data }],
      },
    ],
  }
}

/**
 * create a row with plain strings or explicit `TableCellElement`
 */
function $row(...texts: (string | TableCellElement)[]): TableRowElement {
  return {
    type: "table-row",
    children: texts.map($cell),
  }
}

describe("table", () => {
  describe("simple table", () => {
    it("should convert a 1x2 table", async () => {
      check(
        `|alpha|
|---|
|alpha 1|`,
        [
          {
            type: "table",
            columns: [{ align: "left" }],
            children: [$row("alpha"), $row("alpha 1")],
          },
        ]
      )
    })

    it("should convert a 2x2 table", async () => {
      check(
        `|alpha|bravo|
|---|---|
|alpha 1|bravo 1|`,
        [
          {
            type: "table",
            columns: [{ align: "left" }, { align: "left" }],
            children: [$row("alpha", "bravo"), $row("alpha 1", "bravo 1")],
          },
        ]
      )
    })
  })

  describe("table align", () => {
    it("should align left/center/right", async () => {
      check(
        `|alpha|bravo|charlie|
|:---|:---:|---:|
|alpha 1|bravo 1|charlie 1|`,
        [
          {
            type: "table",
            columns: [
              { align: "left" },
              { align: "center" },
              { align: "right" },
            ],
            children: [
              $row("alpha", "bravo", "charlie"),
              $row("alpha 1", "bravo 1", "charlie 1"),
            ],
          },
        ]
      )
    })

    it("should now show alignment settings if columns are all aligned left", async () => {
      check(
        `|alpha|bravo|charlie|
|---|---|---|
|alpha 1|bravo 1|charlie 1|`,
        [
          {
            type: "table",
            columns: [{ align: "left" }, { align: "left" }, { align: "left" }],
            children: [
              $row("alpha", "bravo", "charlie"),
              $row("alpha 1", "bravo 1", "charlie 1"),
            ],
          },
        ]
      )
    })
  })

  describe("two tables", () => {
    it("should convert two tables", async () => {
      check(
        `|alpha|
|---|
|alpha 1|

|bravo|
|---|
|bravo 1|`,
        [
          {
            type: "table",
            columns: [{ align: "left" }],
            children: [$row("alpha"), $row("alpha 1")],
          },
          {
            type: "table",
            columns: [{ align: "left" }],
            children: [$row("bravo"), $row("bravo 1")],
          },
        ]
      )
    })
  })

  describe("styling in cell", () => {
    it("should allow bold and links in a table cell", async () => {
      check(
        `|alpha|
|---|
|**alpha** [bravo](http://bravo.com/)|`,
        [
          {
            type: "table",
            columns: [{ align: "left" }],
            children: [
              $row("alpha"),
              $row({
                type: "table-cell",
                children: [
                  {
                    type: "table-content",
                    children: [
                      { text: "alpha", bold: true },
                      { text: " " },
                      {
                        type: "anchor",
                        href: "http://bravo.com/",
                        children: [{ text: "bravo" }],
                      },
                      { text: "" },
                    ],
                  },
                ],
              }),
            ],
          },
        ]
      )
    })
  })
})
