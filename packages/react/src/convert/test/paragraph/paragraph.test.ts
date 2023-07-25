import { check } from "../test-utils"

describe("paragraph", () => {
  it("should parse a paragraph", async () => {
    check("Lorem", [
      {
        type: "paragraph",
        children: [{ text: "Lorem" }],
      },
    ])
  })

  it("should parse two paragraphs", async () => {
    check("alpha\n\nbravo", [
      {
        type: "paragraph",
        children: [{ text: "alpha" }],
      },
      {
        type: "paragraph",
        children: [{ text: "bravo" }],
      },
    ])
  })

  it("should parse an empty string as a paragraph", async () => {
    check("", [
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ])
  })

  it("should parse a newline as a paragraph and returns empty string for Markdown", async () => {
    check(
      "\n",
      [
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ],
      ""
    )
  })

  it("should parse two newlines as a paragraph returns empty string for Markdown", async () => {
    check(
      "\n\n",
      [
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ],
      ""
    )
  })
})
