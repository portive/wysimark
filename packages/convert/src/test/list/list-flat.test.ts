import { parse } from "../.."

describe("index", () => {
  describe("flat lists", () => {
    it("should parse an unordered list", async () => {
      const value = parse(`- alpha\n- bravo`)
      expect(value).toEqual([
        {
          type: "unordered-list-item",
          depth: 0,
          children: [{ text: "alpha" }],
        },
        {
          type: "unordered-list-item",
          depth: 0,
          children: [{ text: "bravo" }],
        },
      ])
    })

    it("should parse an ordered list", async () => {
      const value = parse(`1. alpha\n2. bravo`)
      expect(value).toEqual([
        {
          type: "ordered-list-item",
          depth: 0,
          children: [{ text: "alpha" }],
        },
        {
          type: "ordered-list-item",
          depth: 0,
          children: [{ text: "bravo" }],
        },
      ])
    })

    it("should parse a task list with an unchecked and checked item", async () => {
      const value = parse(`- [ ] alpha\n- [x] bravo`)
      expect(value).toEqual([
        {
          type: "task-list-item",
          depth: 0,
          checked: false,
          children: [{ text: "alpha" }],
        },
        {
          type: "task-list-item",
          depth: 0,
          checked: true,
          children: [{ text: "bravo" }],
        },
      ])
    })

    it("should mix list types", async () => {
      const value = parse(`- alpha\n1. one\n- [ ] unchecked\n- [x] checked`)
      expect(value).toEqual([
        {
          type: "unordered-list-item",
          depth: 0,
          children: [{ text: "alpha" }],
        },
        {
          type: "ordered-list-item",
          depth: 0,
          children: [{ text: "one" }],
        },
        {
          type: "task-list-item",
          depth: 0,
          checked: false,
          children: [{ text: "unchecked" }],
        },
        {
          type: "task-list-item",
          depth: 0,
          checked: true,
          children: [{ text: "checked" }],
        },
      ])
    })
  })
})
