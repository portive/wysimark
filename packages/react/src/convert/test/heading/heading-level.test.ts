import { check } from "../test-utils"

describe("heading level", () => {
  it("should parse a heading level 1", async () => {
    check("# Lorem", [
      { type: "heading", level: 1, children: [{ text: "Lorem" }] },
    ])
  })

  it("should parse a heading level 2", async () => {
    check("## Lorem", [
      { type: "heading", level: 2, children: [{ text: "Lorem" }] },
    ])
  })

  it("should parse a heading level 3", async () => {
    check("### Lorem", [
      { type: "heading", level: 3, children: [{ text: "Lorem" }] },
    ])
  })

  it("should parse a heading level 4", async () => {
    check("#### Lorem", [
      { type: "heading", level: 4, children: [{ text: "Lorem" }] },
    ])
  })

  it("should parse a heading level 5", async () => {
    check("##### Lorem", [
      { type: "heading", level: 5, children: [{ text: "Lorem" }] },
    ])
  })

  it("should parse a heading level 6", async () => {
    check("###### Lorem", [
      { type: "heading", level: 6, children: [{ text: "Lorem" }] },
    ])
  })
})
