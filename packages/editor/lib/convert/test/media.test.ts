import { RootBlockElement } from "~/editor/types"
import { roundtrip, testParse } from "./convert-test-utils"

describe("images", () => {
  it("should handle an image", () => {
    const blocks: RootBlockElement[] = [
      {
        type: "media",
        alt: "cat",
        url: "https://server.io/cat.jpg",
        children: [{ text: "" }],
      },
    ]
    const markdown = "![cat](https://server.io/cat.jpg)"
    const text = "cat (https://server.io/cat.jpg)"
    roundtrip(blocks, { markdown, text })
  })

  it("should move inline images to the root with mdast-move-images-to-root", () => {
    const markdown = `Hello ![Cat](https://server.io/cat.jpg) World`
    const blocks: RootBlockElement[] = [
      { type: "p", children: [{ text: "Hello " }] },
      {
        type: "media",
        alt: "Cat",
        url: "https://server.io/cat.jpg",
        children: [{ text: "" }],
      },
      { type: "p", children: [{ text: " World" }] },
    ]
    testParse(markdown, blocks)
  })
})

describe("media", () => {
  it("should handle a YouTube video", () => {
    const blocks: RootBlockElement[] = [
      {
        type: "media",
        alt: "YouTube Video",
        url: "https://www.youtube.com/watch?v=kzJLVWnzLqA",
        children: [{ text: "" }],
      },
    ]
    const markdown =
      "![YouTube Video](https://www.youtube.com/watch?v=kzJLVWnzLqA)"
    const text = "YouTube Video (https://www.youtube.com/watch?v=kzJLVWnzLqA)"
    roundtrip(blocks, { markdown, text })
  })
})
