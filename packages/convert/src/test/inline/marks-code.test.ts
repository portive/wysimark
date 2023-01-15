import { check } from "../test-utils"

describe("marks", () => {
  it("single code", async () => {
    check("`alpha`", [
      {
        type: "paragraph",
        children: [{ text: "alpha", code: true }],
      },
    ])
  })

  it("bold code", async () => {
    check("**`alpha`**", [
      {
        type: "paragraph",
        children: [{ text: "alpha", code: true, bold: true }],
      },
    ])
  })

  it("bold italic code", async () => {
    check("**_`alpha`_**", [
      {
        type: "paragraph",
        children: [{ text: "alpha", code: true, bold: true, italic: true }],
      },
    ])
  })

  it("code in link", async () => {
    check("[`alpha` bravo](http://localhost:alpha)", [
      {
        type: "paragraph",
        children: [
          {
            type: "anchor",
            href: "http://localhost:alpha",
            children: [{ text: "alpha", code: true }, { text: " bravo" }],
          },
        ],
      },
    ])
  })

  it("code in mixed marks", async () => {
    check("**_alpha `bravo`_ charlie**", [
      {
        type: "paragraph",
        children: [
          { text: "alpha ", bold: true, italic: true },
          {
            text: "bravo",
            bold: true,
            italic: true,
            code: true,
          },
          { text: " charlie", bold: true },
        ],
      },
    ])
  })

  it("should not escape in inline code", async () => {
    check("`**alpha**`", [
      {
        type: "paragraph",
        children: [{ text: "**alpha**", code: true }],
      },
    ])
  })

  it("should allow backticks", async () => {
    check("`` alpha`bravo` ``", [
      {
        type: "paragraph",
        children: [{ text: "alpha`bravo`", code: true }],
      },
    ])
  })
})
