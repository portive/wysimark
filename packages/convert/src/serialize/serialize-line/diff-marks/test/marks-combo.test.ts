import { diffMarks } from ".."

describe("marks-combo", () => {
  it("should change an inner mark", async () => {
    const diff = diffMarks(["bold", "italic"], ["bold", "strike"])
    expect(diff).toEqual({
      remove: ["italic"],
      add: ["strike"],
      nextOrderedMarks: ["bold", "strike"],
    })
  })

  it("should change two inner marks", async () => {
    const diff = diffMarks(
      ["bold", "italic", "underline"],
      ["bold", "strike", "sup"]
    )
    expect(diff).toEqual({
      remove: ["underline", "italic"],
      add: ["strike", "sup"],
      nextOrderedMarks: ["bold", "strike", "sup"],
    })
  })

  it("should change one outer marks with two inner marks", async () => {
    const diff = diffMarks(
      ["bold", "underline", "strike"],
      ["italic", "underline", "strike"]
    )
    expect(diff).toEqual({
      remove: ["strike", "underline", "bold"],
      add: ["italic", "underline", "strike"],
      nextOrderedMarks: ["italic", "underline", "strike"],
    })
  })

  it("should change one outer marks with two inner marks change mark order should give same result", async () => {
    const diff = diffMarks(
      ["bold", "underline", "strike"],
      ["italic", "strike", "underline"]
    )
    expect(diff).toEqual({
      remove: ["strike", "underline", "bold"],
      add: ["italic", "underline", "strike"],
      nextOrderedMarks: ["italic", "underline", "strike"],
    })
  })

  it("should change the middle mark", async () => {
    const diff = diffMarks(
      ["bold", "italic", "strike"],
      ["bold", "underline", "strike"]
    )
    expect(diff).toEqual({
      remove: ["strike", "italic"],
      add: ["underline", "strike"],
      nextOrderedMarks: ["bold", "underline", "strike"],
    })
  })
})
