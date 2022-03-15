import { RootBlockElement } from "~/editor/types"
import { normalize } from "../normalize"
import {
  mergeSegmentsByMark,
  mergeSpaceSegments,
  remarkSpaceSegments,
  splitSegmentsAtBoundaries,
  trimSegments,
} from "../normalize/normalize-line"
import { getMarkPropsFromChildren } from "../utils/get-mark-props"

describe("split segments at boundaries", () => {
  it("should split a line with no children segments", async () => {
    const line = splitSegmentsAtBoundaries([
      { text: "Hello Sweet World", bold: true },
    ])
    expect(line).toEqual([
      { text: "Hello", bold: true },
      { text: " " },
      { text: "Sweet", bold: true },
      { text: " " },
      { text: "World", bold: true },
    ])
  })

  it("should split spaces in links", async () => {
    const line = splitSegmentsAtBoundaries([
      { text: " Hello " },
      { type: "link", url: "", children: [{ text: " a link " }] },
    ])
    expect(line).toEqual([
      { text: " " },
      { text: "Hello" },
      { text: " " },
      {
        type: "link",
        url: "",
        children: [
          { text: " " },
          { text: "a" },
          { text: " " },
          { text: "link" },
          { text: " " },
        ],
      },
    ])
  })

  it("should not split spaces in code", async () => {
    const line = splitSegmentsAtBoundaries([
      { text: " inline code ", code: true },
    ])
    expect(line).toEqual([{ text: " inline code ", code: true }])
  })
})

describe("merge spaces", () => {
  it("should merge spaces", async () => {
    const line = mergeSpaceSegments([
      { text: "Hello", bold: true },
      { text: " " },
      { text: " " },
      { text: "World" },
    ])
    expect(line).toEqual([
      { text: "Hello", bold: true },
      { text: "  " },
      { text: "World" },
    ])
  })

  it("should merge spaces in links", async () => {
    const line = mergeSpaceSegments([
      {
        type: "link",
        url: "",
        children: [
          { text: "a" },
          { text: " " },
          { text: " " },
          { text: "link" },
        ],
      },
    ])
    expect(line).toEqual([
      {
        type: "link",
        url: "",
        children: [{ text: "a" }, { text: "  " }, { text: "link" }],
      },
    ])
  })

  it("should not merge spaces in code segments", async () => {
    const line = mergeSpaceSegments([
      { text: " ", code: true },
      { text: " ", code: true },
    ])
    expect(line).toEqual([
      { text: " ", code: true },
      { text: " ", code: true },
    ])
  })
})

describe("trim segments", () => {
  it("should trim spaces", async () => {
    const line = trimSegments(
      [
        { text: " " },
        { text: "Hello", bold: true },
        { text: "  " },
        { text: "World" },
        { text: " " },
      ],
      { trimStart: true, trimEnd: true }
    )
    expect(line).toEqual([
      { text: "Hello", bold: true },
      { text: "  " },
      { text: "World" },
    ])
  })

  it("should not trim links and code segments", async () => {
    const line = trimSegments(
      [
        { type: "link", url: "", children: [{ text: " " }] },
        { text: " ", code: true },
      ],
      { trimStart: true, trimEnd: true }
    )
    expect(line).toEqual([
      { type: "link", url: "", children: [{ text: "" }] },
      { text: " ", code: true },
    ])
  })

  it("should not trim links and code segments", async () => {
    const line = trimSegments(
      [
        { text: " ", code: true },
        { type: "link", url: "", children: [{ text: " " }] },
      ],
      { trimStart: true, trimEnd: true }
    )
    expect(line).toEqual([
      { text: " ", code: true },
      { type: "link", url: "", children: [{ text: "" }] },
    ])
  })
})

describe("remark space segments", () => {
  it("should merge two plain text", async () => {
    const segments = remarkSpaceSegments([
      { text: "hello" },
      { text: " " },
      { text: "world" },
    ])
    expect(segments).toEqual([
      { text: "hello" },
      { text: " " },
      { text: "world" },
    ])
  })

  it("should merge two bold text", async () => {
    const segments = remarkSpaceSegments([
      { text: "hello", bold: true },
      { text: " " },
      { text: "world", bold: true },
    ])
    expect(segments).toEqual([
      { text: "hello", bold: true },
      { text: " ", bold: true },
      { text: "world", bold: true },
    ])
  })

  it("should not merge plain and bold", async () => {
    const segments = remarkSpaceSegments([
      { text: "hello", bold: true },
      { text: " " },
      { text: "world" },
    ])
    expect(segments).toEqual([
      { text: "hello", bold: true },
      { text: " " },
      { text: "world" },
    ])
  })

  it("should not merge bold and bold/italic", async () => {
    const segments = remarkSpaceSegments([
      { text: "hello", bold: true, italic: true },
      { text: " " },
      { text: "world", bold: true },
    ])
    expect(segments).toEqual([
      { text: "hello", bold: true, italic: true },
      { text: " ", bold: true },
      { text: "world", bold: true },
    ])
  })

  it("should not merge while being okay with the order", async () => {
    const segments = remarkSpaceSegments([
      { text: "hello", bold: true },
      { text: " " },
      { text: "world", bold: true, italic: true },
    ])
    expect(segments).toEqual([
      { text: "hello", bold: true },
      { text: " ", bold: true },
      { text: "world", bold: true, italic: true },
    ])
  })

  it("should not merge while being okay with the order", async () => {
    const segments = remarkSpaceSegments([
      { text: "hello", italic: true },
      { text: " " },
      { text: "world", bold: true, italic: true },
    ])
    expect(segments).toEqual([
      { text: "hello", italic: true },
      { text: " ", italic: true },
      { text: "world", bold: true, italic: true },
    ])
  })

  it("should make sure token position is correct", async () => {
    const segments = remarkSpaceSegments([
      { text: "hello", italic: true },
      { text: " " },
      { text: "world", bold: true, italic: true },
      { text: " " },
      { text: "world", bold: true },
    ])
    expect(segments).toEqual([
      { text: "hello", italic: true },
      { text: " ", italic: true },
      { text: "world", bold: true, italic: true },
      { text: " " },
      { text: "world", bold: true },
    ])
  })

  it("should not merge while breaking the order", async () => {
    const segments = remarkSpaceSegments([
      { text: "hello", bold: true },
      { text: " " },
      { text: "world", bold: true, italic: true },
      { text: " " },
      { text: "world", italic: true },
    ])
    expect(segments).toEqual([
      { text: "hello", bold: true },
      { text: " ", bold: true },
      { text: "world", bold: true, italic: true },
      { text: " " },
      { text: "world", italic: true },
    ])
  })
})

describe("get ordered marks from children", () => {
  it("should get mark props from link one mark", async () => {
    const markProps = getMarkPropsFromChildren({
      type: "link",
      url: "",
      children: [
        { text: "a", bold: true },
        { text: " " },
        { text: "b", bold: true },
      ],
    })
    expect(markProps).toEqual({ bold: true })
  })

  it("should get mark props from link one of two marks", async () => {
    const markProps = getMarkPropsFromChildren({
      type: "link",
      url: "",
      children: [
        { text: "a", bold: true, italic: true },
        { text: " " },
        { text: "b", bold: true },
      ],
    })
    expect(markProps).toEqual({ bold: true })
  })

  it("should get marks props from link two of many marks", async () => {
    const markProps = getMarkPropsFromChildren({
      type: "link",
      url: "",
      children: [
        { text: "a", bold: true, italic: true },
        { text: " " },
        { text: "b", bold: true, italic: true, sub: true },
        { text: " " },
        { text: "c", bold: true, italic: true, sup: true },
      ],
    })
    expect(markProps).toEqual({ bold: true, italic: true })
  })
})

describe("remark space segments for links", () => {
  it("should remark link children", async () => {
    const segments = remarkSpaceSegments([
      {
        type: "link",
        url: "",
        children: [
          { text: "a", bold: true },
          { text: " " },
          { text: "c", bold: true },
        ],
      },
    ])
    expect(segments).toEqual([
      {
        type: "link",
        url: "",
        children: [
          { text: "a", bold: true },
          { text: " ", bold: true },
          { text: "c", bold: true },
        ],
      },
    ])
  })

  it("should remark around a link", async () => {
    const segments = remarkSpaceSegments([
      { text: "hello", bold: true },
      { text: " " },
      {
        type: "link",
        url: "",
        children: [
          { text: "a", bold: true },
          { text: " " },
          { text: "c", bold: true },
        ],
      },
    ])
    expect(segments).toEqual([
      { text: "hello", bold: true },
      { text: " ", bold: true },
      {
        type: "link",
        url: "",
        children: [
          { text: "a", bold: true },
          { text: " ", bold: true },
          { text: "c", bold: true },
        ],
      },
    ])
  })
})

describe("remark space segments for code segments", () => {
  it("should not remark in code segments", async () => {
    /**
     * Technically, I think this would not happen if we write our normalizer
     * correctly for Slate; however, we should handle the edge case.
     */
    const segments = remarkSpaceSegments([
      { text: "Hello", code: true },
      { text: " ", code: true },
      { text: "world", code: true },
    ])
    expect(segments).toEqual([
      { text: "Hello", code: true },
      { text: " ", code: true },
      { text: "world", code: true },
    ])
  })

  it("should remark around a code segment", async () => {
    const segments = remarkSpaceSegments([
      { text: "hello", bold: true },
      { text: " " },
      { text: "a", bold: true, code: true },
    ])
    expect(segments).toEqual([
      { text: "hello", bold: true },
      { text: " ", bold: true },
      { text: "a", bold: true, code: true },
    ])
  })
})

describe("merge marks", () => {
  it("should merge plain", async () => {
    const segments = mergeSegmentsByMark([
      { text: "hello" },
      { text: " " },
      { text: "world" },
    ])
    expect(segments).toEqual([{ text: "hello world" }])
  })

  it("should merge mixed", async () => {
    const segments = mergeSegmentsByMark([
      { text: "hello", bold: true },
      { text: " ", bold: true },
      { text: "world", bold: true, italic: true },
    ])
    expect(segments).toEqual([
      { text: "hello ", bold: true },
      { text: "world", bold: true, italic: true },
    ])
  })

  it("should merge marks in a link", async () => {
    const segments = mergeSegmentsByMark([
      {
        type: "link",
        url: "",
        children: [{ text: "hello" }, { text: " " }, { text: "world" }],
      },
    ])
    expect(segments).toEqual([
      {
        type: "link",
        url: "",
        children: [{ text: "hello world" }],
      },
    ])
  })
})

describe("normalize root blocks", () => {
  it("should normalize blocks", async () => {
    const blocks: RootBlockElement[] = [
      {
        type: "p",
        children: [
          { text: " Hello ", bold: true },
          {
            type: "link",
            url: "",
            children: [
              { text: " a ", bold: true },
              { text: " link ", bold: true },
            ],
          },
        ],
      },
    ]
    const normalizedBlocks = normalize(blocks)
    expect(normalizedBlocks).toEqual([
      {
        type: "p",
        children: [
          { text: "Hello ", bold: true },
          {
            type: "link",
            url: "",
            children: [{ text: "a  link", bold: true }],
          },
        ],
      },
    ])
  })
})
