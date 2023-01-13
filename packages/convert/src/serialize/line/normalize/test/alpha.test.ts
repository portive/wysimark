import { normalizeLine } from ".."

describe("normalize line spaces", () => {
  describe("spaces between words", () => {
    it("should normalize space on right of word", async () => {
      const nodes = normalizeLine([{ text: "alpha " }, { text: "bravo" }])
      expect(nodes).toEqual([
        { text: "alpha" },
        { text: " " },
        { text: "bravo" },
      ])
    })
    it("should normalize space on left of word", async () => {
      const nodes = normalizeLine([{ text: "alpha" }, { text: " bravo" }])
      expect(nodes).toEqual([
        { text: "alpha" },
        { text: " " },
        { text: "bravo" },
      ])
    })
    it("should normalize spaces on left and right of word", async () => {
      const nodes = normalizeLine([{ text: "alpha " }, { text: " bravo" }])
      expect(nodes).toEqual([
        { text: "alpha" },
        { text: "  " },
        { text: "bravo" },
      ])
    })
  })
  describe("merge spaces", () => {
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
  })
  describe("non space breaks", () => {
    it("should not normalize boundaries in the middle of a word", async () => {
      const nodes = normalizeLine([
        { text: "alpha b", bold: true },
        { text: "rav" },
        { text: "o charlie", italic: true },
      ])
      expect(nodes).toEqual([
        { text: "alpha b", bold: true },
        { text: "rav" },
        { text: "o charlie", italic: true },
      ])
    })
  })
  describe("spaces at the start and end of a line", () => {
    it("should trim space at the start of a line", async () => {
      const nodes = normalizeLine([{ text: " alpha" }])
      expect(nodes).toEqual([{ text: "alpha" }])
    })
    it("should trim space at the end of a line", async () => {
      const nodes = normalizeLine([{ text: "alpha " }])
      expect(nodes).toEqual([{ text: "alpha" }])
    })
    it("should trim space at the start and end of a line", async () => {
      const nodes = normalizeLine([{ text: " alpha " }])
      expect(nodes).toEqual([{ text: "alpha" }])
    })
  })
  describe("spaces between words", () => {
    it("should normalize space on right of word", async () => {
      const nodes = normalizeLine([{ text: "alpha " }, { text: "bravo" }])
      expect(nodes).toEqual([
        { text: "alpha" },
        { text: " " },
        { text: "bravo" },
      ])
    })
    it("should normalize space on left of word", async () => {
      const nodes = normalizeLine([{ text: "alpha" }, { text: " bravo" }])
      expect(nodes).toEqual([
        { text: "alpha" },
        { text: " " },
        { text: "bravo" },
      ])
    })
    it("should normalize spaces on left and right of word", async () => {
      const nodes = normalizeLine([{ text: "alpha " }, { text: " bravo" }])
      expect(nodes).toEqual([
        { text: "alpha" },
        { text: "  " },
        { text: "bravo" },
      ])
    })
  })
})
