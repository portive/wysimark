import { getCommonAnchorMarks } from ".."

function log(x: unknown) {
  console.log(JSON.stringify(x, null, 2))
}

describe("get common anchor marks", () => {
  describe("single child", () => {
    it("should find no common anchor marks", async () => {
      const marks = getCommonAnchorMarks([{ text: "alpha" }])
      expect(marks).toEqual([])
    })

    it("should find a single bold mark", async () => {
      const marks = getCommonAnchorMarks([{ text: "alpha", bold: true }])
      expect(marks).toEqual(["bold"])
    })

    it("should find a bold and italic mark", async () => {
      const marks = getCommonAnchorMarks([
        { text: "alpha", bold: true, italic: true },
      ])
      expect(marks).toEqual(["bold", "italic"])
    })
  })

  describe("two children", () => {
    it("should find no common anchor marks", async () => {
      const marks = getCommonAnchorMarks([{ text: "alpha" }, { text: "bravo" }])
      expect(marks).toEqual([])
    })

    it("should find one common bold mark", async () => {
      const marks = getCommonAnchorMarks([
        { text: "alpha", bold: true, italic: true },
        { text: "bravo", bold: true },
      ])
      expect(marks).toEqual(["bold"])
    })

    it("should find no common marks in a bold and italic text", async () => {
      const marks = getCommonAnchorMarks([
        { text: "alpha", italic: true },
        { text: "bravo", bold: true },
      ])
      expect(marks).toEqual([])
    })
  })

  describe("three children", () => {
    it("should find one common bold mark in three segments", async () => {
      const marks = getCommonAnchorMarks([
        { text: "alpha", bold: true, italic: true },
        { text: "bravo", bold: true },
        { text: "alpha", bold: true, strike: true },
      ])
      expect(marks).toEqual(["bold"])
    })
  })

  describe("plain spaces", () => {
    it("should ignore plain spaces in calculation", async () => {
      const marks = getCommonAnchorMarks([
        { text: "alpha", bold: true, italic: true },
        { text: " " },
        { text: "alpha", bold: true, strike: true },
      ])
      expect(marks).toEqual(["bold"])
    })
  })

  describe("invalid nested anchors", () => {
    it("should throw on a nested anchor", async () => {
      expect(() =>
        getCommonAnchorMarks([
          { type: "anchor", href: "", children: [{ text: "" }] },
        ])
      ).toThrow(/expected.*text/i)
    })
  })
})
