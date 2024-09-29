import { check } from "../test-utils"

describe("nested lists", () => {
  it("should parse a nested unordered list", async () => {
    check(
      `1. alpha

2. bravo

    1. bravo a

    2. bravo b

        1. bravo b i

    3. bravo c

3. charlie`,

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
        {
          type: "ordered-list-item",
          depth: 1,
          children: [{ text: "bravo a" }],
        },
        {
          type: "ordered-list-item",
          depth: 1,
          children: [{ text: "bravo b" }],
        },
        {
          type: "ordered-list-item",
          depth: 2,
          children: [{ text: "bravo b i" }],
        },
        {
          type: "ordered-list-item",
          depth: 1,
          children: [{ text: "bravo c" }],
        },
        {
          type: "ordered-list-item",
          depth: 0,
          children: [{ text: "charlie" }],
        },
      ]
    )
  })

  it("should restart numbering after an unordered list item", async () => {
    check(
      `1. alpha

- bullet

1. bravo`,
      [
        {
          type: "ordered-list-item",
          depth: 0,
          children: [{ text: "alpha" }],
        },
        {
          type: "unordered-list-item",
          depth: 0,
          children: [{ text: "bullet" }],
        },
        {
          type: "ordered-list-item",
          depth: 0,
          children: [{ text: "bravo" }],
        },
      ]
    )
  })

  it("should restart numbering after a task list item", async () => {
    check(
      `1. alpha

- [ ] task

1. bravo`,
      [
        {
          type: "ordered-list-item",
          depth: 0,
          children: [{ text: "alpha" }],
        },
        {
          type: "task-list-item",
          checked: false,
          depth: 0,
          children: [{ text: "task" }],
        },
        {
          type: "ordered-list-item",
          depth: 0,
          children: [{ text: "bravo" }],
        },
      ]
    )
  })

  it("should restart numbering after a task list item", async () => {
    check(
      `1. numbered

    1. numbered

    - bullet

    1. numbered

    2. numbered

2. numbered`,
      [
        {
          type: "ordered-list-item",
          depth: 0,
          children: [{ text: "numbered" }],
        },
        {
          type: "ordered-list-item",
          depth: 1,
          children: [{ text: "numbered" }],
        },
        {
          type: "unordered-list-item",
          depth: 1,
          children: [{ text: "bullet" }],
        },
        {
          type: "ordered-list-item",
          depth: 1,
          children: [{ text: "numbered" }],
        },
        {
          type: "ordered-list-item",
          depth: 1,
          children: [{ text: "numbered" }],
        },
        {
          type: "ordered-list-item",
          depth: 0,
          children: [{ text: "numbered" }],
        },
      ]
    )
  })

  it("should restart numbering of inner lists", async () => {
    check(
      `1. numbered

    1. numbered

        1. numbered

    2. numbered

        1. numbered

        2. numbered

    3. numbered

2. numbered`,
      [
        {
          type: "ordered-list-item",
          depth: 0,
          children: [{ text: "numbered" }],
        },
        {
          type: "ordered-list-item",
          depth: 1,
          children: [{ text: "numbered" }],
        },
        {
          type: "ordered-list-item",
          depth: 2,
          children: [{ text: "numbered" }],
        },
        {
          type: "ordered-list-item",
          depth: 1,
          children: [{ text: "numbered" }],
        },
        {
          type: "ordered-list-item",
          depth: 2,
          children: [{ text: "numbered" }],
        },
        {
          type: "ordered-list-item",
          depth: 2,
          children: [{ text: "numbered" }],
        },
        {
          type: "ordered-list-item",
          depth: 1,
          children: [{ text: "numbered" }],
        },
        {
          type: "ordered-list-item",
          depth: 0,
          children: [{ text: "numbered" }],
        },
      ]
    )
  })
})
