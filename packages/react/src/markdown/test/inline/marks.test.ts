import { check } from "../test-utils"

describe("marks", () => {
  it("should bold", async () => {
    check("alpha **bravo** charlie", [
      {
        type: "paragraph",
        children: [
          { text: "alpha " },
          { text: "bravo", bold: true },
          { text: " charlie" },
        ],
      },
    ])
  })

  it("should bold with underscores", async () => {
    check(
      "alpha __bravo__ charlie",
      [
        {
          type: "paragraph",
          children: [
            { text: "alpha " },
            { text: "bravo", bold: true },
            { text: " charlie" },
          ],
        },
      ],
      "alpha **bravo** charlie"
    )
  })

  it("should italicize", async () => {
    check("alpha _bravo_ charlie", [
      {
        type: "paragraph",
        children: [
          { text: "alpha " },
          { text: "bravo", italic: true },
          { text: " charlie" },
        ],
      },
    ])
  })

  it("should italicize with underscore", async () => {
    check("alpha _bravo_ charlie", [
      {
        type: "paragraph",
        children: [
          { text: "alpha " },
          { text: "bravo", italic: true },
          { text: " charlie" },
        ],
      },
    ])
  })

  it("should strike with one and regenerate with two", async () => {
    check(
      "alpha ~bravo~ charlie",
      [
        {
          type: "paragraph",
          children: [
            { text: "alpha " },
            { text: "bravo", strike: true },
            { text: " charlie" },
          ],
        },
      ],
      "alpha ~~bravo~~ charlie"
    )
  })

  it("should strike with two", async () => {
    check("alpha ~~bravo~~ charlie", [
      {
        type: "paragraph",
        children: [
          { text: "alpha " },
          { text: "bravo", strike: true },
          { text: " charlie" },
        ],
      },
    ])
  })

  it("should pile on marks", async () => {
    check("alpha **_~~bravo~~_** charlie", [
      {
        type: "paragraph",
        children: [
          { text: "alpha " },
          { text: "bravo", bold: true, italic: true, strike: true },
          { text: " charlie" },
        ],
      },
    ])
  })
})
