import { diffMarks } from ".."

describe("marks-to-remove", () => {
  describe("remove one mark", () => {
    it("should remove one mark", async () => {
      const diff = diffMarks(["bold"], [])
      expect(diff).toEqual({ remove: ["bold"], add: [], nextOrderedMarks: [] })
    })
  })

  describe("remove two marks", () => {
    it("should remove two marks bold then italic", async () => {
      const diff = diffMarks(["bold", "italic"], [])
      expect(diff).toEqual({
        remove: ["italic", "bold"],
        add: [],
        nextOrderedMarks: [],
      })
    })

    it("should remove two marks italic then bold", async () => {
      const diff = diffMarks(["italic", "bold"], [])
      expect(diff).toEqual({
        remove: ["bold", "italic"],
        add: [],
        nextOrderedMarks: [],
      })
    })
  })

  describe("remove partial marks", () => {
    it("should remove innermost mark only", async () => {
      const diff = diffMarks(["bold", "italic"], ["bold"])
      expect(diff).toEqual({
        remove: ["italic"],
        add: [],
        nextOrderedMarks: ["bold"],
      })
    })

    it("should remove all to get back to inner", async () => {
      const diff = diffMarks(["bold", "italic"], ["italic"])
      expect(diff).toEqual({
        remove: ["italic", "bold"],
        add: ["italic"],
        nextOrderedMarks: ["italic"],
      })
    })
  })
})
