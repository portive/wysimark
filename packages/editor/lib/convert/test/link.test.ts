import { p, roundtrip } from "./convert-test-utils"

describe("link", () => {
  it("should parse a link", () => {
    const blocks = p({
      type: "link",
      url: "https://www.google.com/",
      children: [{ text: "Google " }, { text: "Canada" }],
    })
    const markdown = "[Google Canada](https://www.google.com/)"
    const text = "Google Canada"
    roundtrip(blocks, { markdown, text })
  })

  it("should not autolink", () => {
    const blocks = p({ text: "its https://www.google.com/" })
    const markdown = "its https://www\\.google\\.com/"
    const text = "its https://www.google.com/"
    roundtrip(blocks, { markdown, text })
  })

  it.only("should handle a link with marks in it", async () => {
    const blocks = p({
      type: "link",
      url: "https://www.google.com/",
      children: [
        { text: "Google ", italic: true },
        { text: "Canada", bold: true },
      ],
    })
    const markdown = "[_Google_ **Canada**](https://www.google.com/)"
    const text = "Google Canada"
    roundtrip(blocks, { markdown, text })
  })

  it("should handle an empty link", async () => {
    const blocks = p({
      type: "link",
      url: "https://www.google.com/",
      children: [{ text: "" }],
    })
    const markdown = ""
    const text = ""
    roundtrip(blocks, { markdown, text })
  })
})
