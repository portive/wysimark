import { normalizeLine } from "../../normalize-line"

describe("merge adjacent spaces", () => {
  it("should merge a bunch of spaces into one space", async () => {
    const nodes = normalizeLine([
      { text: " " },
      { text: " ", bold: true },
      { text: " ", italic: true },
      { text: " " },
    ])
    expect(nodes).toEqual([{ text: "" }])
  })

  it("should merge a bunch of spaces into one space even when there are attached to words", async () => {
    const nodes = normalizeLine([
      { text: "alpha " },
      { text: " ", bold: true },
      { text: " bravo", italic: true },
    ])
    expect(nodes).toEqual([
      { text: "alpha" },
      { text: "   " }, // 3 spaces
      { text: "bravo", italic: true },
    ])
  })

  it("should not merge spaces if it's code", async () => {
    const nodes = normalizeLine([
      { text: "alpha" },
      { text: " ", code: true },
      { text: " " },
      { text: "bravo" },
    ])
    expect(nodes).toEqual([
      { text: "alpha" },
      { text: " ", code: true },
      { text: " " },
      { text: "bravo" },
    ])
  })
})
