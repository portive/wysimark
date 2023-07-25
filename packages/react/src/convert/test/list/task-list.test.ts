import { check, parse, serialize } from "../test-utils"

describe("task list", () => {
  /**
   * NOTE: General task list tests are in the other tests. This is specifically
   * for testing parse/serialization of an empty task list
   */
  it("should serialize empty task lists", async () => {
    const markdown = serialize([
      {
        type: "task-list-item",
        depth: 0,
        checked: false,
        children: [{ text: `` }],
      },
      {
        type: "task-list-item",
        depth: 0,
        checked: true,
        children: [{ text: `` }],
      },
    ])
    expect(markdown).toEqual(`- [ ] &#32;\n\n- [x] &#32;`)
  })

  it("should parse empty task lists", async () => {
    /**
     * TODO: Consider converting a single "&#32;" to an empty string instead
     * of to a literal space in the document.
     */
    const doc = parse(`- [ ] &#32;\n- [x] &#32;`)
    expect(doc).toEqual([
      {
        type: "task-list-item",
        depth: 0,
        checked: false,
        children: [
          {
            text: " ",
          },
        ],
      },
      {
        type: "task-list-item",
        depth: 0,
        checked: true,
        children: [
          {
            text: " ",
          },
        ],
      },
    ])
  })

  it("should rountrip empty task list", async () => {
    check(
      `- [ ] &#32;\n- [x] &#32;`,
      [
        {
          type: "task-list-item",
          depth: 0,
          checked: false,
          children: [{ text: ` ` }],
        },
        {
          type: "task-list-item",
          depth: 0,
          checked: true,
          children: [{ text: ` ` }],
        },
      ],
      `- [ ] &#32;\n\n- [x] &#32;`
    )
  })
})
