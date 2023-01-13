import { normalizeLine } from ".."

describe("normalize line spaces", () => {
  describe("spaces between words", () => {
    it("should normalize space on right of word", async () => {
      const segments = normalizeLine([{ text: "alpha " }, { text: "bravo" }])
      expect(segments).toEqual([
        { text: "alpha" },
        { text: " " },
        { text: "bravo" },
      ])
    })
    it("should normalize space on left of word", async () => {
      const segments = normalizeLine([{ text: "alpha" }, { text: " bravo" }])
      expect(segments).toEqual([
        { text: "alpha" },
        { text: " " },
        { text: "bravo" },
      ])
    })
    it("should normalize spaces on left and right of word", async () => {
      const segments = normalizeLine([{ text: "alpha " }, { text: " bravo" }])
      expect(segments).toEqual([
        { text: "alpha" },
        { text: "  " },
        { text: "bravo" },
      ])
    })
  })
  describe("merge spaces", () => {
    it("should merge a bunch of spaces into one space", async () => {
      const segments = normalizeLine([
        { text: " " },
        { text: " ", bold: true },
        { text: " ", italic: true },
        { text: " " },
      ])
      console.log(segments)
      expect(segments).toEqual([{ text: "    " }])
    })
    it("should merge a bunch of spaces into one space even when there are attached to words", async () => {
      const segments = normalizeLine([
        { text: "alpha " },
        { text: " ", bold: true },
        { text: " bravo", italic: true },
      ])
      expect(segments).toEqual([
        { text: "alpha" },
        { text: "   " }, // 3 spaces
        { text: "bravo", italic: true },
      ])
    })
  })
  describe("non space breaks", () => {
    it("should not normalize boundaries in the middle of a word", async () => {
      const segments = normalizeLine([
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
  })
  describe("spaces at the start and end of a line", () => {
    it("should normalize space at the start of a line", async () => {
      const segments = normalizeLine([{ text: " alpha" }])
      expect(segments).toEqual([{ text: " " }, { text: "alpha" }])
    })
    it("should normalize space at the end of a line", async () => {
      const segments = normalizeLine([{ text: "alpha " }])
      expect(segments).toEqual([{ text: "alpha" }, { text: " " }])
    })
    it("should normalize space at the start and end of a line", async () => {
      const segments = normalizeLine([{ text: " alpha " }])
      expect(segments).toEqual([
        { text: " " },
        { text: "alpha" },
        { text: " " },
      ])
    })
  })
  describe("spaces between words", () => {
    it("should normalize space on right of word", async () => {
      const segments = normalizeLine([{ text: "alpha " }, { text: "bravo" }])
      expect(segments).toEqual([
        { text: "alpha" },
        { text: " " },
        { text: "bravo" },
      ])
    })
    it("should normalize space on left of word", async () => {
      const segments = normalizeLine([{ text: "alpha" }, { text: " bravo" }])
      expect(segments).toEqual([
        { text: "alpha" },
        { text: " " },
        { text: "bravo" },
      ])
    })
    it("should normalize spaces on left and right of word", async () => {
      const segments = normalizeLine([{ text: "alpha " }, { text: " bravo" }])
      expect(segments).toEqual([
        { text: "alpha" },
        { text: "  " },
        { text: "bravo" },
      ])
    })
  })
})
