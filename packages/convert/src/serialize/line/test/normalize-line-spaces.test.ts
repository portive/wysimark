import { normalizeLineSpaces } from "../normalize-line-spaces"

describe("normalize space in line", () => {
  it("should normalize a bunch of marked spaces", async () => {
    const segments = normalizeLineSpaces([
      { text: " " },
      { text: " ", bold: true },
      { text: " ", italic: true },
      { text: " " },
    ])
    expect(segments).toEqual([{ text: "    " }])
  })

  it("should not normalize breaks in the middle of text", async () => {
    const segments = normalizeLineSpaces([
      { text: "alpha b", bold: true },
      { text: "rav" },
      { text: "o charlie", italic: true },
    ])
    expect(segments).toEqual([
      { text: "alpha b", bold: true },
      { text: "rav" },
      { text: "o charlie", italic: true },
    ])
  })

  it("should normalize space on right of word", async () => {
    const segments = normalizeLineSpaces([
      { text: "alpha " },
      { text: "bravo" },
    ])
    expect(segments).toEqual([
      { text: "alpha" },
      { text: " " },
      { text: "bravo" },
    ])
  })

  it("should normalize space on left of word", async () => {
    const segments = normalizeLineSpaces([
      { text: "alpha" },
      { text: " bravo" },
    ])
    expect(segments).toEqual([
      { text: "alpha" },
      { text: " " },
      { text: "bravo" },
    ])
  })

  it("should normalize spaces on left and right of word", async () => {
    const segments = normalizeLineSpaces([
      { text: "alpha " },
      { text: " bravo" },
    ])
    expect(segments).toEqual([
      { text: "alpha" },
      { text: "  " },
      { text: "bravo" },
    ])
  })
})
