import { normalizeLine } from ".."

describe("normalize trim line", () => {
  it("should trim a leading space", async () => {
    const nodes = normalizeLine([{ text: " " }, { text: "alpha" }])
    expect(nodes).toEqual([{ text: "alpha" }])
  })

  it("should trim a trailing space", async () => {
    const nodes = normalizeLine([{ text: "alpha" }, { text: " " }])
    expect(nodes).toEqual([{ text: "alpha" }])
  })

  it("should trim an only space", async () => {
    const nodes = normalizeLine([{ text: " " }])
    expect(nodes).toEqual([{ text: "" }])
  })
})
