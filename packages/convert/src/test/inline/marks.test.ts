import { parse } from "../.."
import { check } from "../test-utils"

describe("marks", () => {
  it("should bold", async () => {
    // check("alpha **bravo** charlie", [
    //   {
    //     type: "paragraph",
    //     children: [
    //       { text: "alpha " },
    //       { text: "bravo", bold: true },
    //       { text: " charlie" },
    //     ],
    //   },
    // ])
    const value = parse("alpha **bravo** charlie")
    expect(value).toEqual([
      {
        type: "paragraph",
        children: [
          { text: "alpha " },
          { text: "bravo", bold: true },
          { text: " charlie" },
        ],
      },
    ])
  })

  it("should bold with underscores", async () => {
    const value = parse("alpha __bravo__ charlie")
    expect(value).toEqual([
      {
        type: "paragraph",
        children: [
          { text: "alpha " },
          { text: "bravo", bold: true },
          { text: " charlie" },
        ],
      },
    ])
  })

  it("should italicize", async () => {
    const value = parse("alpha *bravo* charlie")
    expect(value).toEqual([
      {
        type: "paragraph",
        children: [
          { text: "alpha " },
          { text: "bravo", italic: true },
          { text: " charlie" },
        ],
      },
    ])
  })

  it("should italicize with underscore", async () => {
    const value = parse("alpha _bravo_ charlie")
    expect(value).toEqual([
      {
        type: "paragraph",
        children: [
          { text: "alpha " },
          { text: "bravo", italic: true },
          { text: " charlie" },
        ],
      },
    ])
  })

  it("should strike with one", async () => {
    const value = parse("alpha ~bravo~ charlie")
    expect(value).toEqual([
      {
        type: "paragraph",
        children: [
          { text: "alpha " },
          { text: "bravo", strike: true },
          { text: " charlie" },
        ],
      },
    ])
  })

  it("should strike with two", async () => {
    const value = parse("alpha ~~bravo~~ charlie")
    expect(value).toEqual([
      {
        type: "paragraph",
        children: [
          { text: "alpha " },
          { text: "bravo", strike: true },
          { text: " charlie" },
        ],
      },
    ])
  })

  it("should pile on marks", async () => {
    const value = parse("alpha **_~~bravo~~_** charlie")
    expect(value).toEqual([
      {
        type: "paragraph",
        children: [
          { text: "alpha " },
          { text: "bravo", bold: true, italic: true, strike: true },
          { text: " charlie" },
        ],
      },
    ])
  })
})
