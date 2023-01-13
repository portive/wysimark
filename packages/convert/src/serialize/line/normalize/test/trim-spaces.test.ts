import { normalizeLine } from ".."

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

  it("should reduce a space only to an empty string", async () => {
    const nodes = normalizeLine([{ text: " " }])
    expect(nodes).toEqual([{ text: "" }])
  })
})
