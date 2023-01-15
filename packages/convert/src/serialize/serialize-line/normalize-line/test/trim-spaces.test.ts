import { normalizeLine } from ".."

describe("spaces at the start and end of a line", () => {
  describe("trim spaces", () => {
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

    it("should reduce a space only to an empty string", async () => {
      const nodes = normalizeLine([{ text: " " }])
      expect(nodes).toEqual([{ text: "" }])
    })
  })

  describe("ignore trim spaces in code", () => {
    it("should not trim code space at the start of a line", async () => {
      const nodes = normalizeLine([
        { text: " ", code: true },
        { text: " alpha " },
      ])
      expect(nodes).toEqual([
        { text: " ", code: true },
        { text: " " },
        { text: "alpha" },
      ])
    })

    it("should not trim code space at the end of a line", async () => {
      const nodes = normalizeLine([
        { text: " alpha " },
        { text: " ", code: true },
      ])
      expect(nodes).toEqual([
        { text: "alpha" },
        { text: " " },
        { text: " ", code: true },
      ])
    })

    it("should not trim code space at the start and end of a line", async () => {
      const nodes = normalizeLine([
        { text: " ", code: true },
        { text: " alpha " },
        { text: " ", code: true },
      ])
      expect(nodes).toEqual([
        { text: " ", code: true },
        { text: " " },
        { text: "alpha" },
        { text: " " },
        { text: " ", code: true },
      ])
    })
  })
})
