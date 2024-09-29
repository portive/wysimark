import { check } from "../test-utils"

describe("nested lists", () => {
  /**
   * TODO: Should not escape `.` except when in critical positions like `1.`
   */
  it("should parse a nested unordered list", async () => {
    check(
      `- a
  - a.1
  - a.2
    - a.2.a
  - a.3
    - a.3.a
- b`,
      [
        {
          type: "unordered-list-item",
          depth: 0,
          children: [{ text: "a" }],
        },
        {
          type: "unordered-list-item",
          depth: 1,
          children: [{ text: "a.1" }],
        },
        {
          type: "unordered-list-item",
          depth: 1,
          children: [{ text: "a.2" }],
        },
        {
          type: "unordered-list-item",
          depth: 2,
          children: [{ text: "a.2.a" }],
        },
        {
          type: "unordered-list-item",
          depth: 1,
          children: [{ text: "a.3" }],
        },
        {
          type: "unordered-list-item",
          depth: 2,
          children: [{ text: "a.3.a" }],
        },
        {
          type: "unordered-list-item",
          depth: 0,
          children: [{ text: "b" }],
        },
      ],
      `- a

    - a\\.1

    - a\\.2

        - a\\.2\\.a

    - a\\.3

        - a\\.3\\.a

- b`
    )
  })

  it("should parse a nested mixed list", async () => {
    check(
      `- a
  - a.1
  - a.2
    1. a.2.a
    2. a.2.b
  - a.3
    - a.3.a
      - [ ] unchecked
      - [x] checked
- b`,
      [
        {
          type: "unordered-list-item",
          depth: 0,
          children: [{ text: "a" }],
        },
        {
          type: "unordered-list-item",
          depth: 1,
          children: [{ text: "a.1" }],
        },
        {
          type: "unordered-list-item",
          depth: 1,
          children: [{ text: "a.2" }],
        },
        {
          type: "ordered-list-item",
          depth: 2,
          children: [{ text: "a.2.a" }],
        },
        {
          type: "ordered-list-item",
          depth: 2,
          children: [{ text: "a.2.b" }],
        },
        {
          type: "unordered-list-item",
          depth: 1,
          children: [{ text: "a.3" }],
        },
        {
          type: "unordered-list-item",
          depth: 2,
          children: [{ text: "a.3.a" }],
        },
        {
          type: "task-list-item",
          depth: 3,
          checked: false,
          children: [{ text: "unchecked" }],
        },
        {
          type: "task-list-item",
          depth: 3,
          checked: true,
          children: [{ text: "checked" }],
        },
        {
          type: "unordered-list-item",
          depth: 0,
          children: [{ text: "b" }],
        },
      ],
      `- a

    - a\\.1

    - a\\.2

        1. a\\.2\\.a

        2. a\\.2\\.b

    - a\\.3

        - a\\.3\\.a

            - [ ] unchecked

            - [x] checked

- b`
    )
  })
})
