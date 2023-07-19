import { check, parse, serialize } from "../test-utils"

describe("index", () => {
  describe("flat lists", () => {
    it("should parse an unordered list", async () => {
      check(
        `- alpha\n- bravo`,
        [
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
        ],
        `- alpha\n\n- bravo`
      )
    })

    it("should parse an ordered list", async () => {
      check(
        `1. alpha\n2. bravo`,
        [
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
        ],
        `1. alpha\n\n2. bravo`
      )
    })

    it("should parse a task list with an unchecked and checked item", async () => {
      check(
        `- [ ] alpha\n- [x] bravo`,
        [
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
        ],
        `- [ ] alpha\n\n- [x] bravo`
      )
    })

    it("should mix list types", async () => {
      check(
        `- alpha\n1. one\n- [ ] unchecked\n- [x] checked`,
        [
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
        ],
        `- alpha\n\n1. one\n\n- [ ] unchecked\n\n- [x] checked`
      )
    })
  })
})
