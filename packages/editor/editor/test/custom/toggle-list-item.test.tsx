/** @jsx jsx  */
import { toggleListItem } from "~/editor/custom"
import { withEditor } from "~/editor/use-editor"
import { compare, jsx } from "../test-utils"

describe("Custom.toggleListItem", () => {
  describe("toggle from a paragraph", () => {
    it("should toggle a paragraph to a bullet", async () => {
      const input = (
        <editor>
          <p>
            <cursor />
            abc
          </p>
        </editor>
      )
      const output = (
        <editor>
          <unordered-list-item depth={0}>
            <cursor />
            abc
          </unordered-list-item>
        </editor>
      )
      compare(input, output, (editor) =>
        toggleListItem(editor, "unordered-list-item")
      )
    })

    it("should toggle a paragraph to a numbered list and add a number", async () => {
      const input = withEditor(
        <editor>
          <p>
            <cursor />
            abc
          </p>
        </editor>
      )
      const output = (
        <editor>
          <ordered-list-item depth={0} number={1}>
            <cursor />
            abc
          </ordered-list-item>
        </editor>
      )
      compare(input, output, (editor) => {
        toggleListItem(editor, "ordered-list-item")
      })
    })

    it("should toggle a paragraph to a check list and add a checked property", async () => {
      const input = withEditor(
        <editor>
          <p>
            <cursor />
            abc
          </p>
        </editor>
      )
      const output = (
        <editor>
          <task-list-item depth={0} checked={false}>
            <cursor />
            abc
          </task-list-item>
        </editor>
      )
      compare(input, output, (editor) => {
        toggleListItem(editor, "task-list-item")
      })
    })
  })

  describe("toggle matches to a paragraph", () => {
    it("should toggle bullets to a paragraph", async () => {
      const input = (
        <editor>
          <unordered-list-item depth={0}>
            <cursor />
            abc
          </unordered-list-item>
        </editor>
      )
      const output = (
        <editor>
          <p>
            <cursor />
            abc
          </p>
        </editor>
      )
      compare(input, output, (editor) => {
        toggleListItem(editor, "unordered-list-item")
      })
    })

    it("should toggle ordered lists to a paragraph", async () => {
      const input = (
        <editor>
          <ordered-list-item depth={0} number={1}>
            <cursor />
            abc
          </ordered-list-item>
        </editor>
      )
      const output = (
        <editor>
          <p>
            <cursor />
            abc
          </p>
        </editor>
      )
      compare(input, output, (editor) => {
        toggleListItem(editor, "ordered-list-item")
      })
    })

    it("should toggle task lists to a paragraph", async () => {
      const input = (
        <editor>
          <task-list-item depth={0} checked>
            <anchor />
            abc
          </task-list-item>
          <task-list-item depth={0} checked={false}>
            def
            <focus />
          </task-list-item>
        </editor>
      )
      const output = (
        <editor>
          <p>
            <anchor />
            abc
          </p>
          <p>
            def
            <focus />
          </p>
        </editor>
      )
      compare(input, output, (editor) => {
        toggleListItem(editor, "task-list-item")
      })
    })
  })

  describe("toggle mixed lists", () => {
    it("should toggle mixed list items to list items even if there is a match", async () => {
      const input = (
        <editor>
          <unordered-list-item depth={0}>
            <anchor />
            abc
          </unordered-list-item>
          <ordered-list-item depth={1} number={1}>
            def
          </ordered-list-item>
          <task-list-item depth={2} checked={false}>
            ghi
            <focus />
          </task-list-item>
        </editor>
      )
      const output = (
        <editor>
          <unordered-list-item depth={0}>
            <anchor />
            abc
          </unordered-list-item>
          <unordered-list-item depth={1}>def</unordered-list-item>
          <unordered-list-item depth={2}>
            ghi
            <focus />
          </unordered-list-item>
        </editor>
      )
      compare(input, output, (editor) =>
        toggleListItem(editor, "unordered-list-item")
      )
    })
  })

  describe("toggle from one list item type to another", () => {
    it("should toggle from a task list to an unordered list", async () => {
      const input = (
        <editor>
          <task-list-item depth={0} checked={false}>
            <cursor />
            abc
          </task-list-item>
        </editor>
      )
      const output = (
        <editor>
          <unordered-list-item depth={0}>
            <cursor />
            abc
          </unordered-list-item>
        </editor>
      )
      compare(input, output, (editor) => {
        toggleListItem(editor, "unordered-list-item")
      })
    })

    it("should toggle from an ordered list to an unordered list", async () => {
      const input = (
        <editor>
          <ordered-list-item depth={0} number={1}>
            <cursor />
            abc
          </ordered-list-item>
        </editor>
      )
      const output = (
        <editor>
          <unordered-list-item depth={0}>
            <cursor />
            abc
          </unordered-list-item>
        </editor>
      )
      compare(input, output, (editor) => {
        toggleListItem(editor, "unordered-list-item")
      })
    })
  })
})
