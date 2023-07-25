import { diffMarks } from "../../diff-marks"

describe("marks-to-add", () => {
  it("should add one mark", async () => {
    const diff = diffMarks([], ["bold"])
    expect(diff).toEqual({
      remove: [],
      add: ["bold"],
      nextOrderedMarks: ["bold"],
    })
  })

  it("should add two marks bold first when bold is first", async () => {
    {
      const diff = diffMarks([], ["bold", "italic"])
      expect(diff).toEqual({
        remove: [],
        add: ["bold", "italic"],
        nextOrderedMarks: ["bold", "italic"],
      })
    }
  })

  it("should add two marks bold first even when italic is first", async () => {
    {
      const diff = diffMarks([], ["italic", "bold"])
      expect(diff).toEqual({
        remove: [],
        add: ["bold", "italic"],
        nextOrderedMarks: ["bold", "italic"],
      })
    }
  })
})
